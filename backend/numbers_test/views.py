from tokenize import Number
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NumberModel, Comment
from .serializers import NumberSerializer, CommentSerializer
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# from .utils import EnablePartialUpdateMixin


# Create your views here.
class NumberView(viewsets.ModelViewSet):

    # a queryset is a collection of data from a db built up as a 
    # list of objects. This queryset will look something like this:
    #     <QuerySet [
    #       <NumberModel: 6>,
    #       <NumberModel: 17>,
    #       ...
    #     ]>
    # the objects represent the number of rows in our db
    queryset = NumberModel.objects.all()
    
    # print(queryset)

    # this is a valid way of printing through data in a queryset
    # for x in queryset:
    #     print(x.number)
    # Expected: console output of number data in database such as:
    # 6
    # 17
    # ...

    # in order to use this data more easily, we use a serializer
    # serializer_class is an instance of our Number Serializer class
    serializer_class = NumberSerializer


class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

