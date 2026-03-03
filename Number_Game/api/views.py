from django.shortcuts import render
from django.http import JsonResponse
from .models import Student

def get_game_data(request):
    # Return array of student objects as expected by frontend
    students = Student.objects.all()
    data = list(students.values('id', 'name', 'email'))
    return JsonResponse(data, safe=False)