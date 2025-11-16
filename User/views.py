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






# --- Authentication Views ---

# Register API
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


# -------------------------
# Login API (Knox-based)
# -------------------------
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


# -------------------------
# Get User API
# -------------------------
class UserAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })
# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#             "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             "token": AuthToken.objects.create(user)[1]
#         })
    
# # User/views.py

# class CustomLoginView(KnoxLoginView):
#     permission_classes = [AllowAny]
#     def post(self, request, format=None):
#         serializer = AuthTokenSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         login(request, user)

#         # call Knox's built-in post to get token + expiry
#         response = super(CustomLoginView, self).post(request, format=None)

#         # add user info to the response
#         response.data["user"] = {
#             "id": user.id,
#             "username": user.username,
#             "email": user.email,
#         }
#         return response

# class CustomLoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, format=None):
#         username = request.data.get('username')
#         password = request.data.get('password')
        
#         user = authenticate(username=username, password=password)
        
#         if user is not None:
#             if user.is_active:
#                 login(request, user)
#                 # Create Knox token
#                 token = AuthToken.objects.create(user)
                
#                 return Response({
#                     "token": token[1],
#                     "expiry": token[0].expiry,
#                     "user": {
#                         "id": user.id,
#                         "username": user.username,
#                         "email": user.email,
#                     }
#                 })
#             else:
#                 return Response({"error": "User account is disabled."}, 
#                               status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({"error": "Unable to log in with provided credentials."}, 
#                           status=status.HTTP_400_BAD_REQUEST)

# class UserAPI(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, format=None):
#         user = request.user
#         return Response({
#             "id": user.id,
#             "username": user.username,
#             "email": user.email,
#         })


# api/views.py - Add debugging to understand what's happening
# class LoginAPI(KnoxLoginView):
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, format=None):
#         print("Login request received:", request.data)  # Debug
#         serializer = LoginSerializer(data=request.data)
        
#         if not serializer.is_valid():
#             print("Serializer errors:", serializer.errors)  # Debug
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
#         user = serializer.validated_data['user']
#         print("User authenticated:", user.username)  # Debug
#         login(request, user)
#         response = super(LoginAPI, self).post(request, format=None)
        
#         # Add user data to the response
#         response.data['user'] = UserSerializer(user).data
#         print("Login response:", response.data)  # Debug
#         return response
# Note: Login and Logout views are provided by the knox library, configured in the urls.py

# --- Generic Views for Public Data ---

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
        # This view should only return data for the currently authenticated user.
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically associate the new object with the logged-in user.
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
    
    # Add explicit queryset
    queryset = Progress.objects.all()

    def get_object(self):
        # Ensure we always fetch progress for the logged-in user
        progress, created = Progress.objects.get_or_create(user=self.request.user)
        return progress
    
class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all().order_by("created_at")
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

# class ChatSessionViewSet(viewsets.ModelViewSet):
#     serializer_class = ChatSessionSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     # Add this to explicitly define the queryset
#     queryset = ChatSession.objects.all()

#     def get_queryset(self):
#         # Users can only see their own chat sessions
#         return ChatSession.objects.filter(user=self.request.user).order_by('-created_at')

  
# class MessageViewSet(viewsets.ModelViewSet):
#     serializer_class = MessageSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     # Add this to explicitly define the queryset
#     queryset = Message.objects.all()

#     def get_queryset(self):
#         # Users can only see messages from their own chat sessions
#         return Message.objects.filter(session__user=self.request.user)
  

# class ExpertViewSet(viewsets.ModelViewSet):
#     queryset = Expert.objects.all()
#     serializer_class = ExpertSerializer
#     permission_classes = [permissions.IsAuthenticated]
