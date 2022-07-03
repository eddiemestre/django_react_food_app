from urllib import request
from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import ReviewModel
from .serializers import ReviewSerializer, ReviewListSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from account.models import Account

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
            print(user, "Is authed")
            return ReviewModel.objects.filter(user=user).order_by('-date')


class GetAuthedReview(generics.ListAPIView):
    serializer_class = ReviewListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
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


# have a viewset that gets public reviews, doesn't require permission_classes
class PublicReviewList(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewListSerializer
    permission_classes = (AllowAny,)
  
    def get_queryset(self):
            return ReviewModel.objects.filter(private=False)

    def post(self, request, format=None):
        data = request.data
        email = data.get('email', None)
        print("data", data)
        response = Response()    
        print("inside django get")
        print("email", email)
        account = Account.objects.get(email=email)
        print(account.id)
        reviews = ReviewModel.objects.filter(user=account.id).filter(private=False).order_by('-date')
        
        test = [{'id': review.pk, 
                'title': review.title, 
                'review': review.review, 
                'date': review.date, 
                'date_modified': review.date_modified, 
                'private': review.private } for review in reviews]

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