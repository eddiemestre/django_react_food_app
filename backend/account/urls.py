from django.urls import path, include
from rest_framework import routers
from account import views
from .views import ChangePasswordView, UpdateProfileView, LogoutView, LogoutAllView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

# router = routers.DefaultRouter()
# router.register(r'registration', views.RegistrationAPI.as_view(), 'register')

router = routers.DefaultRouter()
router.register(r'update_profile', UpdateProfileView, 'update_profile')

urlpatterns = [
    path('register/', views.RegistrationAPI.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('logout_all/', LogoutAllView.as_view(), name='logout_all'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='change_password'),
    path('', include(router.urls), name='update_profile'),
]