import json
from django.forms import PasswordInput
from django.http import Http404
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.contrib import messages
from .authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
from .serializers import ChangePasswordSerializer, UserRegistration, UpdateUserSerializer, UserSerializer
from .models import Account
from rest_framework.response import Response
from rest_framework import generics, authentication, exceptions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken, BlacklistedToken, AccessToken
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.authentication import get_authorization_header
from rest_framework import viewsets



from django.middleware import csrf
from django.conf import settings

# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token),
    }


# inherits from CreateAPIView which has a built in post function
class RegistrationAPI(generics.CreateAPIView):
    queryset = Account.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistration

            
class GetUserID(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        print(self.request.data)
        user = self.request.user
        user_id = user.id
        print("user:", user)

        if user.is_authenticated:
            
            # return user_account.
            return Account.objects.filter(id=user_id)

class GetOtherID(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    
    
    def retrieve(self, request, *args, **kwargs):
        username = None
        print("kwargs", kwargs)
        if 'pk' in kwargs:
            username = self.kwargs['pk']
        userData = Account.objects.get(username=username)
        print("userData", userData)
        if not userData:
            raise Http404
            
        response = Response()
        response.data = {'username': userData.username, 
                        'name': userData.name }

        return response



class UserAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        if not email or not password:
            raise exceptions.AuthenticationFailed(('No credentials provided.'))

        credentials = {
            get_user_model().USERNAME_FIELD: email,
            'password': password
        }

        user = authenticate(**credentials)

        if user is None:
            raise exceptions.AuthenticationFailed(('Invalid username/password.'))

        if not user.is_active:
            raise exceptions.AuthenticationFailed(('User inactive or deleted.'))
        
        return (user, None)


class ChangePasswordView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer


class UpdateProfileView(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            response = Response()
            
            token = RefreshToken(refresh_token)
            token.blacklist()

            # this isn't working?
            response.delete_cookie("refresh_token")

            return Response({'message': 'successfully logged out.'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response( status=status.HTTP_400_BAD_REQUEST)

class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)

        return Response(status=status.HTTP_205_RESET_CONTENT)

        
class LoginView(APIView):
    def post(self, request, format=None):
        data = request.data
        response = Response()        
        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.is_active:
                access_token = create_access_token(user.id)
                refresh_token = create_refresh_token(user.id)
                response.set_cookie(
                    key = "refresh_token", 
                    value = refresh_token,
                    expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    # secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY']
                    # samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
                # csrf.get_token(request)
                response.data = {"access_token": access_token}
                return response
            else:
                return Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"Invalid" : "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)


class RefreshAPIView(APIView):
   
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)

        return Response({
            "access_token": access_token
        })


from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken

class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        print("cookie? in token serializer", self.context['request'].COOKIES.get('refresh_token'))
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        print("attrs refresh", attrs['refresh'])
        if attrs['refresh']:
            print("in refresh if statement", super().validate(attrs))
            return super().validate(attrs)
        else:
            print("inside else")
            raise InvalidToken('No valid token found in cookie \'refresh_token\'')

class CookieTokenObtainPairView(TokenObtainPairView):
  def finalize_response(self, request, response, *args, **kwargs):
    if response.data.get('refresh'):
        cookie_max_age = 3600 * 24 * 14 # 14 days
        response.set_cookie('refresh_token', 
            response.data['refresh'], 
            max_age=cookie_max_age, 
            httponly=True, 
            secure=True, 
            samesite='None')
        del response.data['refresh']
    return super().finalize_response(request, response, *args, **kwargs)

class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer
    
    def finalize_response(self, request, response, *args, **kwargs):
        # if token hasn't expired, run this function, otherwise return error
        if response.data.get('access'):
            print("inside finalize response access")
            return super().finalize_response(request, response, *args, **kwargs)
        else:
            raise Http404