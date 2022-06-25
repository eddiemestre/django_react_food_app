from urllib import request
from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import ReviewModel
from .serializers import ReviewSerializer, ReviewListSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
# List reviews according to authenticated user
# is this useful?
class ReviewList(generics.ListAPIView):
    #queryset = ReviewModel.objects.all()
    serializer_class = ReviewListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        print(self.request.data)
        user = self.request.user
        print("user:", user)

        if user.is_authenticated:
            return ReviewModel.objects.filter(user=user).order_by('-date')


# Create your views here.
class ReviewView(viewsets.ModelViewSet):
    #queryset = ReviewModel.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        print("user:", user)
        return ReviewModel.objects.filter(user=user)


# have a viewset that gets public reviews, doesn't require permission_classes
class PublicReviewList(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewListSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return ReviewModel.objects.filter(private=False)
