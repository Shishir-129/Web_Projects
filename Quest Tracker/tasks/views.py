from django.shortcuts import render, redirect
from .models import Task
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login

@login_required 
def index(request):
    # Only show tasks belonging to the current user
    tasks = Task.objects.filter(user=request.user) 
    
    if request.method == 'POST':
        # Assign the task to the current user automatically
        new_task = Task(title=request.POST['title'], user=request.user)
        new_task.save()
        return redirect('/')
        
    return render(request, 'tasks/list.html', {'tasks': tasks})

@login_required
def delete_task(request, pk):
    task = Task.objects.get(id=pk) # Get the task with the given primary key (id)
    task.delete() # Delete the task from the database
    return redirect('/') # Redirect to the homepage to see the updated task list

@login_required
def toggle_task(request, pk):
    task = Task.objects.get(id=pk) # Get the task with the given primary key (id)
    task.completed = not task.completed # Toggle the completed status
    task.save() # Save the updated task to the database
    return redirect('/') # Redirect to the homepage to see the updated task list


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user) # Log the user in after signing up
            return redirect('/')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})