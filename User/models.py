
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


class SleepStory(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    audio_file = models.FileField(upload_to='audio/sleep_stories/')
    duration_in_seconds = models.PositiveIntegerField()

    def __str__(self):
        return self.title

class Meditation(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    audio_file = models.FileField(upload_to='audio/meditations/')
    duration_in_seconds = models.PositiveIntegerField()

    def __str__(self):
        return self.title

class MoodEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mood_entries')
    mood_rating = models.PositiveIntegerField()  # A scale, e.g., 1-10
    quote = models.TextField(blank=True) # Quote can be generated based on mood on the frontend or backend
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mood rating of {self.mood_rating} for {self.user.username} at {self.timestamp.strftime('%Y-%m-%d')}"

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journal_entries')
    entry_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Journal entry for {self.user.username} at {self.timestamp.strftime('%Y-%m-%d')}"

class Gratitude(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='gratitudes')
    gratitude_text = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Gratitude from {self.user.username}: '{self.gratitude_text}'"

class Progress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="progress")
    completed_tasks = models.JSONField(default=list)  # stores tasks ["Stress Journal", "Gratitude Practice"]

    def __str__(self):
        return f"{self.user.username}'s Progress"

# chat/models.py


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)










    