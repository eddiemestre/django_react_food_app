from django.urls import path, include
from rest_framework import routers
from .views import ReviewList, ReviewView, PublicReviewList, GetAuthedReview

router = routers.DefaultRouter()
router.register(r'review', ReviewView, 'review')
router.register(r'public', PublicReviewList, 'public_reviews')
# router.register(r'authed_review/<int:pk>', GetAuthedReview, 'authed_review')
# router.register(r'my_reviews', views.ReviewList, 'my_reviews')

urlpatterns = [
    path('', include(router.urls)),
    path('my_reviews/', ReviewList.as_view(), name='my_reviews'),
    path('my_reviews/<int:pk>/', GetAuthedReview.as_view(), name='auth_review')
    
]