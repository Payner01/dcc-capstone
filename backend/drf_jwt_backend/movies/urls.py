from django.urls import path
from movies import views

urlpatterns = [
    path('', views.add_to_favorites)
]