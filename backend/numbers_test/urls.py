from django.urls import path, include
from rest_framework import routers
from numbers_test import views

router = routers.DefaultRouter()
router.register(r'numbers', views.NumberView, 'number')
router.register(r'comments', views.CommentView, 'comment')

urlpatterns = [
    path('',include(router.urls)),
]