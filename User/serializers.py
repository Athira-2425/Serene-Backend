# api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError("User account is disabled.")
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")
        
        return data
# --- App Data Serializers ---

class SleepStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepStory
        fields = '__all__'

class MeditationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meditation
        fields = '__all__'

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ('id', 'user', 'mood_rating', 'quote', 'timestamp')
        read_only_fields = ('user',) # User will be set automatically from the request

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ('id', 'user', 'entry_text', 'timestamp')
        read_only_fields = ('user',)

class GratitudeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gratitude
        fields = ('id', 'user', 'gratitude_text', 'timestamp')
        read_only_fields = ('user',)

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = ["id", "user", "completed_tasks"]
        read_only_fields = ["user"]


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"

# class ExpertSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Expert
#         fields = "__all__"

# class MessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Message
#         fields = ["id", "session", "sender", "text", "timestamp", "is_read"]
#         read_only_fields = ["id", "timestamp"]

# class ChatSessionSerializer(serializers.ModelSerializer):
#     expert_name = serializers.CharField(source='expert.name', read_only=True)
#     expert_specialty = serializers.CharField(source='expert.specialty', read_only=True)
#     messages = MessageSerializer(many=True, read_only=True)
    
#     class Meta:
#         model = ChatSession
#         fields = ["id", "user", "expert", "expert_name", "expert_specialty", "created_at", "is_active", "messages"]
#         read_only_fields = ["user", "created_at"]