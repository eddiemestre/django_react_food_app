from django.urls import path, include
from rest_framework import routers
from .views import ReviewList, ReviewView, PublicReviewList

router = routers.DefaultRouter()
router.register(r'review', ReviewView, 'review')
router.register(r'public', PublicReviewList, 'public_reviews')
# router.register(r'my_reviews', views.ReviewList, 'my_reviews')

urlpatterns = [
    path('', include(router.urls)),
    path('my_reviews/', ReviewList.as_view(), name='my_reviews'),
    # path('<int:pk>/', PublicReviewList.as_view(), name='public_reviews'),
    # path('my_reviews/', views.ReviewList.as_view(), name="my_reviews"),
]