from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='list'),
    # <int:pk> is the Task ID
    path('delete/<int:pk>/',views.delete_task,name='delete'), # URL pattern for deleting a task
    path('toggle/<int:pk>/',views.toggle_task,name='toggle'), # URL pattern for toggling task completion
    path('signup/', views.signup, name='signup'), # URL pattern for user signup
]