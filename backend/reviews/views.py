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
    #queryset = ReviewModel.objects.all()
    serializer_class = ReviewListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        print(self.request.data)
        user = self.request.user
        print("user:", user)

        if user.is_authenticated:
            print(user, "Is authed")
            return ReviewModel.objects.filter(user=user).order_by('-date')
    
    def delete(self):
        print("delete")


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
        print("here?")
        print("self", self)
        print("request", request)
        print("args", args)
        print("kwargs", kwargs)
        review_pk = None
        if 'pk' in kwargs:
            review_pk = self.kwargs['pk']
        review = ReviewModel.objects.filter(id=review_pk).filter(private=False)
        print("review", review)
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
                        'user': review.user.name,
                        'username': review.user.username,
                        'email': review.user.email }

        return response

    
        

class GetSingleAuthReview(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)

    # don't need name because it's in localStorage for list view
    def get_queryset(self):
        print(self.request.data)
        user = self.request.user
        print("user:", user)

        if user.is_authenticated:
            print(user, "Is authed")
            return ReviewModel.objects.filter(user=user).order_by('-date')

    # retrieve all necessary review info
    def retrieve(self, request, *args, **kwargs):
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
                        'user': review.user.name,
                        'username': review.user.username,
                        'email': review.user.email }

        # print(test)

        # response.data = test
        # response.data = {"data": self.serializer_class(review).data, "user_name": review.user.name}
        # account = Account.objects.get(id=review.user.name)
        # print(account)
        return response

    def destroy(self, request, pk=None):
        print("delete", pk)
        try: 
            review = ReviewModel.objects.get(id=pk)
            review.delete()
        except:
            raise Http404
        response = Response()
        return response

    # def partial_update(self, request, pk=None):
    #     print("update", pk)
    #     response = Response()
    #     return response


class GetAuthedReview(generics.ListAPIView):
    serializer_class = ReviewListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        print("self", self.kwargs)
        review_pk = None
        if 'pk' in self.kwargs:
            print(self.kwargs['pk'])
            review_pk = self.kwargs['pk']
        user = self.request.user
        print("user:", user)

        if user.is_authenticated:
            print(user, "Is for this")
            return ReviewModel.objects.filter(user=user).filter(id=review_pk).order_by('-date')

    # def post(self, request, pk):
    #     print("get pk", pk)
    #     user = self.request.user
    #     print("user pk", user)
    #     if user.is_authenticated:
    #         print("inside get user authenticated", user)
    #         review = ReviewModel.objects.filter(user=user).get(pk=pk)
    #         print(review)
    #     response = Response()
    #     return response
    
# class GetAuthedReview(viewsets.ReadOnlyModelViewSet):
#     serializer_class = ReviewListSerializer
#     permission_classes = (AllowAny,)

#     # def get_queryset(self, pk):
#     #     user = self.request.user
#     #     print("user in authed review django", user)
#     #     return ReviewModel.objects.filter(user=user)
#     def get_queryset(self):
#             return ReviewModel.objects.filter(private=False)


#     def get(self, request, pk):
#         user = self.request.user
#         print("authed???", user.is_authenticated)
#         response = Response()
#         response = "hello"
#         return response

#     # def post(self, request, pk):
#     #     print("get pk", pk)
#     #     user = self.request.user
#     #     print("user pk", user)
#     #     if user.is_authenticated:
#     #         print("inside get user authenticated", user)
#     #         review = ReviewModel.objects.filter(user=user).get(pk=pk)
#     #         print(review)
#     #     response = Response()
#     #     return response
    
# Create your views here.
class ReviewView(viewsets.ModelViewSet):
    #queryset = ReviewModel.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        print("user:", user)
        return ReviewModel.objects.filter(user=user)


# gets list of reviews for specific account
class PublicReviewList(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewListSerializer
    permission_classes = (AllowAny,)
  
    # def get_queryset(self):
    #         return ReviewModel.objects.filter(private=False)

    def post(self, request, format=None):
        data = request.data
        username = data.get('username', None)
        print("data", data)
        response = Response()    
        print("inside django get")
        print("username", username)
        account = ''
        
        try:
            account = Account.objects.get(username=username)
        except:
            raise Http404
 
        print(account.id)
        reviews = ReviewModel.objects.filter(user=account.id).filter(private=False).order_by('-date')
        
        test = [{'id': review.pk, 
                'title': review.title, 
                'review': review.review, 
                'date': review.date, 
                'date_modified': review.date_modified, 
                'private': review.private,
                'user': review.user.name,
                'username': review.user.username,
                'email': review.user.email } for review in reviews]

        print(test)

        response.data = test
        return response


    # title = models.CharField(max_length=120)
    # date = models.DateTimeField(null=True, blank=True)
    # date_modified = models.DateField(auto_now=True)
    # date_created = models.DateField(auto_now_add=True)
    # review = models.TextField(null=True, blank=True)
    # private = models.BooleanField(default=False)
    # user =