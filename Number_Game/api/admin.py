from django.contrib import admin
from .models import Student, GameScore

# Register your models here.
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email']
    search_fields = ['name', 'email']

@admin.register(GameScore)
class GameScoreAdmin(admin.ModelAdmin):
    list_display = ['id', 'player_name', 'score', 'created_at']
    list_filter = ['created_at']
    search_fields = ['player_name']
