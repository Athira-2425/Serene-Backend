# api/views.py

from rest_framework import viewsets, permissions, generics,status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
from .models import *
from django.contrib.auth import login
from knox.views import LoginView as KnoxLoginView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.db.models import Q

from rest_framework.permissions import AllowAny
from rest_framework.authtoken.serializers import AuthTokenSerializer

from rest_framework.views import APIView


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = AuthToken.objects.create(user)
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            "token": token[1],
        })


class CustomLoginView(KnoxLoginView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)  # Django login
        response = super(CustomLoginView, self).post(request, format=None)
        response.data["user"] = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
        return response


class UserAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })


class SleepStoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for viewing sleep stories."""
    queryset = SleepStory.objects.all()
    serializer_class = SleepStorySerializer
    permission_classes = [permissions.IsAuthenticated]

class MeditationViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for viewing meditations."""
    queryset = Meditation.objects.all()
    serializer_class = MeditationSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserDataViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
       
        serializer.save(user=self.request.user)

class MoodEntryViewSet(UserDataViewSet):
    queryset = MoodEntry.objects.all()
    serializer_class = MoodEntrySerializer

class JournalEntryViewSet(UserDataViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer

class GratitudeViewSet(UserDataViewSet):
    queryset = Gratitude.objects.all()
    serializer_class = GratitudeSerializer

class ProgressViewSet(viewsets.ModelViewSet):
    serializer_class = ProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
   
    queryset = Progress.objects.all()

    def get_object(self):
        
        progress, created = Progress.objects.get_or_create(user=self.request.user)
        return progress
    
class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all().order_by("created_at")
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]



