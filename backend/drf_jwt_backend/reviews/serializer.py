from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Review, ReviewLikes

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only = True)
    class Meta:
        model = Review
        fields = ['id', 'user', 'movie_id', 'text' ]

class ReviewLikesSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only = True)
    class Meta:
        model = ReviewLikes
        fields = ['id', 'user', 'like_dislike','review_id'  ]