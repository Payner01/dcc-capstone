import imp
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Review
from .serializer import ReviewSerializer


# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_reviews(request, movie_id):
    reviews = Review.objects.filter(movie_id=movie_id)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)
    

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def create_post(request):
    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        reviews = Review.objects.filter(user_id=request.user.id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)