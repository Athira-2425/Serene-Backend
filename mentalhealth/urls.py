"""
URL configuration for mentalhealth_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """


from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views
from rest_framework.routers import DefaultRouter
from User.views import *

from User.views import CustomLoginView, UserAPI  

    

# Router setup
router = DefaultRouter()
router.register(r'sleepstories', SleepStoryViewSet, basename='sleepstory')
router.register(r'meditations', MeditationViewSet, basename='meditation')
router.register(r'moods', MoodEntryViewSet, basename='moodentry')
router.register(r'journal', JournalEntryViewSet, basename='journalentry')
router.register(r'gratitude', GratitudeViewSet, basename='gratitude')
# router.register(r'experts',ExpertViewSet, basename='expert')
# router.register(r'chat-sessions', ChatSessionViewSet, basename='chatsession')
# router.register(r'messages', MessageViewSet, basename='message')

urlpatterns = [
    path('admin/', admin.site.urls),

    # All API routes from router

    # Authentication
    # path('api/auth/register', RegisterAPI.as_view()),
    # path('api/auth/login', LoginAPI.as_view(), name='knox_login'),
    # path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    # path('api/auth/logoutall', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    
    
    # path("auth/login/", CustomLoginView.as_view(), name="knox_login"),
    # path("auth/logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
    # path("auth/logoutall/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"),
    
    # path("auth/user/", UserAPI.as_view(), name="knox_user"),  # 👈 added
    path('api/', include(router.urls)),
    path('api/auth/', include('knox.urls')),
    path('auth/register/', RegisterAPI.as_view(), name='register'),
    path('auth/login/', CustomLoginView.as_view(), name='login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('auth/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('auth/user/', UserAPI.as_view(), name='user'),
    path("messages/", MessageListCreate.as_view(), name="messages"),
    # Progress tracker
    # path('progress/', ProgressViewSet.as_view(), name="progress-detail"),
]













