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

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def add_to_watchlist(request):
    if request.method == 'POST':
        serializer = WatchLaterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        watch_later = WatchLater.objects.filter(user_id=request.user.id)
        serializer = WatchLaterSerializer(watch_later, many=True)
        return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_fav_movie(request, pk):
    favMovie = FavoriteMovies.objects.get(pk=pk)
    if favMovie.delete():
        return Response(status.HTTP_204_NO_CONTENT)
    return Response(status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_watch_list(request, pk):
    watch_list = WatchLater.objects.get(pk=pk)
    if watch_list.delete():
        return Response(status.HTTP_204_NO_CONTENT)
    return Response(status.HTTP_400_BAD_REQUEST)