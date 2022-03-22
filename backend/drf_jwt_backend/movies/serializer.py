from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FavoriteMovies, WatchLater

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class FavoriteMoviesSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only = True)
    class Meta:
        model = FavoriteMovies
        fields = ['id', 'user', 'movie_id']

class WatchLaterSerializer(serializers.Serializer):
    user = UserSerializer(many=False, read_only = True)
    class Meta:
        model = WatchLater
        fields = ['id', 'user', 'movie_id', 'title', 'image']