

# Register your models here.
# api/admin.py
# from django.contrib import admin
# from .models import *

# # Register your models here to make them accessible in the admin panel.
# admin.site.register(SleepStory)
# admin.site.register(Meditation)
# admin.site.register(MoodEntry)
# admin.site.register(JournalEntry)
# admin.site.register(Gratitude)
# admin.site.register(Progress)



from django.contrib import admin
from .models import *
    
# Register your models here to make them accessible in the admin panel.
admin.site.register(SleepStory)
admin.site.register(Meditation)
admin.site.register(MoodEntry)
admin.site.register(JournalEntry)
admin.site.register(Gratitude)
admin.site.register(Progress)

# New for Talk to Expert
admin.site.register(Message)
# admin.site.register(ChatSession)


