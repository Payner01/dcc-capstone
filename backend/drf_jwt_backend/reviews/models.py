from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.CharField(max_length=100)
    text = models.CharField(max_length=250)

class ReviewLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_id = models.ForeignKey(Review, on_delete=models.CASCADE)
    like_dislike = models.CharField(max_length=20)
