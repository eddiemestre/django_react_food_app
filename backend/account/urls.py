from django.urls import path, include
from rest_framework import routers
from account import views
from .views import ChangePasswordView, RefreshAPIView, UpdateProfileView, LogoutView, LogoutAllView, LoginView, GetUserID, GetOtherID
from .views import CookieTokenObtainPairView, CookieTokenRefreshView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView



router = routers.DefaultRouter()
router.register(r'update_profile', UpdateProfileView, 'update_profile')
router.register(r'get_user', GetUserID, 'get_user')
router.register(r'get_other_user', GetOtherID, 'get_other')

urlpatterns = [
    path('register/', views.RegistrationAPI.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('logout_all/', LogoutAllView.as_view(), name='logout_all'),
    path('login/', CookieTokenObtainPairView.as_view(), name='cookie_token_obtain_pair'),
    path('refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='change_password'),
    path('', include(router.urls), name='update_profile')
    # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # previous 
    # path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # previous
    # path('get_user/', GetUserID.as_view(), name="get_user"),
    # path('logintest/', LoginView.as_view(), name='login'),
    # path('refreshtest/', RefreshAPIView.as_view(), name='refreshtest'),
]