from django.db import models
from django.utils import timezone

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    
    def __str__(self):
        return self.name

class GameScore(models.Model):
    player_name = models.CharField(max_length=100)
    score = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.player_name} - {self.score}"