from urllib import request
from django.http import Http404
from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import ReviewModel
from .serializers import ReviewSerializer, ReviewListSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from account.models import Account

# List reviews according to authenticated user
# is this useful?
class ReviewList(generics.ListAPIView):
    serializer_class = ReviewListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return ReviewModel.objects.filter(user=user).order_by('-date')
    
    # def delete(self):



#test list view
# returns a list of all public reviews if not given a param
# if given a param, returns the public review and user's name
# returns 404 if private
class GetReviewList(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewListSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
            return ReviewModel.objects.filter(private=False).order_by('-date')

    def retrieve(self, request, *args, **kwargs):
        review_pk = None
        if 'pk' in kwargs:
            review_pk = self.kwargs['pk']
        review = ReviewModel.objects.filter(id=review_pk).filter(private=False)

        if not review:
            raise Http404
            
        review = review[0]
        response = Response()
        response.data = {'id': review.pk, 
                        'title': review.title, 
                        'review': review.review, 
                        'date': review.date, 
                        'date_modified': review.date_modified, 
                        'private': review.private,
                        'name': review.user.name,
                        'username': review.user.username,
                        'email': review.user.email }

        return response

    
        

class GetSingleAuthReview(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)

    # don't need name because it's in localStorage for list view
    def get_queryset(self):
        print("in get queryset")
        user = self.request.user
        if user.is_authenticated:
            return ReviewModel.objects.filter(user=user).order_by('-date')

    # retrieve all necessary review info
    def retrieve(self, request, *args, **kwargs):
        print("in retrieve")
        current_user = request.user
        review_pk = None
        if 'pk' in kwargs:
            review_pk = self.kwargs['pk']
        review = ReviewModel.objects.filter(id=review_pk).filter(user=current_user)

        if not review:
            raise Http404

        review = review[0]
        response = Response()
        response.data = {'id': review.pk, 
                        'title': review.title, 
                        'review': review.review, 
                        'date': review.date, 
                        'date_modified': review.date_modified, 
                        'private': review.private,
                        'name': review.user.name,
                        'username': review.user.username,
                        'email': review.user.email }

        return response

    def destroy(self, request, pk=None):
        try: 
            review = ReviewModel.objects.get(id=pk)
            review.delete()
        except:
            raise Http404
        response = Response()
        return response


class GetAuthedReview(generics.ListAPIView):
    serializer_class = ReviewListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        
        review_pk = None
        if 'pk' in self.kwargs:
            review_pk = self.kwargs['pk']
        user = self.request.user

        if user.is_authenticated:
            return ReviewModel.objects.filter(user=user).filter(id=review_pk).order_by('-date')

    
# Create your views here.
class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return ReviewModel.objects.filter(user=user)


# gets list of reviews for specific account
class PublicReviewList(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewListSerializer
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        data = request.data
        username = data.get('username', None)
        response = Response()    
        account = ''
        
        try:
            account = Account.objects.get(username=username)
        except:
            raise Http404
 
        reviews = ReviewModel.objects.filter(user=account.id).filter(private=False).order_by('-date')
        
        test = [{'id': review.pk, 
                'title': review.title, 
                'review': review.review, 
                'date': review.date, 
                'date_modified': review.date_modified, 
                'private': review.private,
                'name': review.user.name,
                'username': review.user.username,
                'email': review.user.email } for review in reviews]

        response.data = test
        return response