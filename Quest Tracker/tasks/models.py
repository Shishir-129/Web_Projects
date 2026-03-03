from django.db import models
from django.contrib.auth.models import User # Import the User model

# Create your models here.

# creates a database table called Task to store tasks
class Task(models.Model):
    # This links the task to a user. If the user is deleted, their tasks are too.
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200) # a text field that stores the task name (max length 200 characters)
    completed = models.BooleanField(default=False) # a checkbox field to indicate if the task is completed or not (Default is False)

    def __str__(self):  #makes the task name visible in the admin panel
        return self.title