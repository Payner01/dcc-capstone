from asyncio.windows_events import NULL
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class FavoriteMovies(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.CharField(max_length=100)

class WatchLater(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, default=NULL)
    movie_id = models.CharField(max_length=100)
    image = models.URLField(max_length=300, default=NULL)
