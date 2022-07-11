from django.urls import path, include
from rest_framework import routers
from account import views
from .views import ChangePasswordView, RefreshAPIView, UpdateProfileView, LogoutView, LogoutAllView, LoginView, GetUserID, GetOtherID
from .views import CookieTokenObtainPairView, CookieTokenRefreshView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

# router = routers.DefaultRouter()
# router.register(r'registration', views.RegistrationAPI.as_view(), 'register')

router = routers.DefaultRouter()
router.register(r'update_profile', UpdateProfileView, 'update_profile')
router.register(r'get_user', GetUserID, 'get_user')
router.register(r'get_other_user', GetOtherID, 'get_other')

urlpatterns = [
    path('register/', views.RegistrationAPI.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('logout_all/', LogoutAllView.as_view(), name='logout_all'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('get_user/', GetUserID.as_view(), name="get_user"),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='change_password'),
    path('', include(router.urls), name='update_profile'),
    path('logintest/', LoginView.as_view(), name='login'),
    path('refreshtest/', RefreshAPIView.as_view(), name='refreshtest'),
    path('login_test_2/', CookieTokenObtainPairView.as_view(), name='cookie_token_obtain_pair'),
    path('login/refresh_2/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    # path('user/', UserAPIView.as_view(), name='user'),
]