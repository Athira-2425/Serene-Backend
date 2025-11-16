# from rest_framework.routers import DefaultRouter
# from User.views import *
   

# router = DefaultRouter()

# # Existing routes
# router.register(r'sleepstories', SleepStoryViewSet, basename='sleepstory')
# router.register(r'meditations', MeditationViewSet, basename='meditation')
# router.register(r'moods', MoodEntryViewSet, basename='moodentry')
# router.register(r'journal', JournalEntryViewSet, basename='journalentry')
# router.register(r'gratitude', GratitudeViewSet, basename='gratitude')

# # New routes for Talk to Expert
# router.register(r'experts', ExpertViewSet, basename='expert')
# router.register(r'chat-sessions', ChatSessionViewSet, basename='chatsession')
# router.register(r'messages', MessageViewSet, basename='message')
# router.register(r'experts', ExpertViewSet, basename='expert')

# urlpatterns = router.urls



# main url old ones 
# mentalhealth/urls.py

# from django.contrib import admin
# from django.urls import path, include
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework import routers # <-- You import the module here
# from knox import views as knox_views
# from User.views import *

# # You create an INSTANCE of the router here
# router = routers.DefaultRouter() 

# # You correctly register your viewsets with the INSTANCE
# router.register(r'sleepstories', SleepStoryViewSet, basename='sleepstory')
# router.register(r'meditations', MeditationViewSet, basename='meditation')
# router.register(r'moods', MoodEntryViewSet, basename='moodentry')
# router.register(r'journal', JournalEntryViewSet, basename='journalentry')
# router.register(r'gratitude', GratitudeViewSet, basename='gratitude')



# urlpatterns = [
#     path('admin/', admin.site.urls),
    
#     # ------------------ THE FIX IS HERE ------------------
#     # It must be include(router.urls), not routers.urls
#     path('api/', include(router.urls)),
#     # ----------------------------------------------------
    
#     path('api/auth/', include('knox.urls')),
#     path('api/auth/register', RegisterAPI.as_view()),
#     # path('api/auth/login', csrf_exempt(knox_views.LoginView.as_view()), name='knox_login'),
#     path('api/auth/login', LoginAPI.as_view(), name='knox_login'),  # Updated this line
#     path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
#     #  path('api/auth/user', current_user, name='current_user'),
#     path('api/auth/logoutall', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),

#     path('progress/', ProgressDetailView.as_view(), name="progress-detail"),
#     path('', include(router.urls)),
   
# # # ]

# from django.contrib import admin
# from django.urls import path, include
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework import routers
# from knox import views as knox_views
# from User.views import *

# # Use a single router instance
# router = routers.DefaultRouter()

# # Register all your viewsets here
# router.register(r'sleepstories', SleepStoryViewSet, basename='sleepstory')
# router.register(r'meditations', MeditationViewSet, basename='meditation')
# router.register(r'moods', MoodEntryViewSet, basename='moodentry')
# router.register(r'journal', JournalEntryViewSet, basename='journalentry')
# router.register(r'gratitude', GratitudeViewSet, basename='gratitude')


# urlpatterns = [
#     path('admin/', admin.site.urls),

#     # API routes from the router
#     path('api/', include(router.urls)),

#     # Authentication
#     path('api/auth/', include('knox.urls')),
#     path('api/auth/register', RegisterAPI.as_view()),
#     path('api/auth/login', LoginAPI.as_view(), name='knox_login'),
#     path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
#     path('api/auth/logoutall', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),

#     # Non-viewset endpoint
#     path('progress/', ProgressDetailView.as_view(), name="progress-detail"),
# ]#working one 

# mentalhealth/urls.py  (your main project urls.py)

















