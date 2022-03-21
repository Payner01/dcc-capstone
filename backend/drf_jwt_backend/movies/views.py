from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import FavoriteMovies, WatchLater
from .serializer import FavoriteMoviesSerializer, WatchLaterSerializer
# Create your views here.



@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def add_to_favorites(request):
    if request.method == 'POST':
        serializer = FavoriteMoviesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        fav_movie = FavoriteMovies.objects.filter(user_id=request.user.id)
        serializer = FavoriteMoviesSerializer(fav_movie, many=True)
        return Response(serializer.data)