# consumers.py
import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from .models import ChatSession, Message
from knox.auth import TokenAuthentication

class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):  
        super().__init__(*args, **kwargs)
        self.typing_task = None

    async def connect(self):
        self.chat_session_id = self.scope['url_route']['kwargs']['chat_session_id']
        self.room_group_name = f'chat_{self.chat_session_id}'
        
        # Get token from query string
        query_params = dict([p.split('=') for p in self.scope['query_string'].decode().split('&') if '=' in p])
        token = query_params.get('token', None)
        
        # Authenticate user
        if token:
            try:
                auth = TokenAuthentication()
                user, auth_token = await database_sync_to_async(auth.authenticate_credentials)(token.encode())
                self.scope['user'] = user
            except Exception as e:
                self.scope['user'] = AnonymousUser()
        else:
            self.scope['user'] = AnonymousUser()
        
        # Check if user is authenticated
        if self.scope['user'].is_anonymous:
            await self.close()
            return
        
        # Verify user has access to this chat session
        has_access = await self.check_chat_access(self.chat_session_id, self.scope['user'])
        if not has_access:
            await self.close()
            return

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Cancel typing task if it exists
        if self.typing_task:
            self.typing_task.cancel()
        
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        
        if data['type'] == 'typing':
            # Send typing indicator to group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'typing_indicator',
                    'is_typing': data['is_typing'],
                    'user_id': str(self.scope['user'].id)
                }
            )
            
        elif data['type'] == 'message':
            # Save message to database
            message_id = await self.save_message(
                data['chat_session_id'], 
                data['sender'], 
                data['message']
            )
            
            # Send message to group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': data['message'],
                    'sender': data['sender'],
                    'message_id': message_id,
                    'user_id': str(self.scope['user'].id)
                }
            )

    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'message',
            'message': event['message'],
            'sender': event['sender'],
            'message_id': event['message_id'],
            'timestamp': str(asyncio.get_event_loop().time())
        }))

    async def typing_indicator(self, event):
        # Don't send typing indicator to the user who is typing
        if event['user_id'] != str(self.scope['user'].id):
            await self.send(text_data=json.dumps({
                'type': 'typing',
                'is_typing': event['is_typing'],
                'user_id': event['user_id']
            }))

    @database_sync_to_async
    def check_chat_access(self, chat_session_id, user):
        try:
            chat_session = ChatSession.objects.get(id=chat_session_id)
            return chat_session.user == user
        except ChatSession.DoesNotExist:
            return False

    @database_sync_to_async
    def save_message(self, chat_session_id, sender, text):
        chat_session = ChatSession.objects.get(id=chat_session_id)
        message = Message.objects.create(
            session=chat_session,
            sender=sender,
            text=text
        )
        return message.id
    