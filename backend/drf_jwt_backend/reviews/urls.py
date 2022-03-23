from django.urls import path
from reviews import views

urlpatterns = [
    path('<str:movie_id>/reviews/', views.get_all_reviews),
    path('', views.create_post),
    path('likesDislike/', views.create_like_dislike),
    path('delete/<int:pk>/', views.delete_review)
]