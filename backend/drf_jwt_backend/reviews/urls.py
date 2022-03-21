from django.urls import path
from reviews import views

urlpatterns = [
    path('<str:movie_id>/reviews/', views.get_all_reviews),
    path('', views.create_post)
]