from django.urls import path
from . import views

urlpatterns = [
    path('api/persons/', views.list_create_persons, name='list_people'),
    # path('api/persons/', views.create_person, name='create_person'),
    path('api/persons/<str:id>/', views.update_person, name='update_person'),
    path('api/personsdel/<str:id>/', views.delete_person, name='delete_person'),
]
