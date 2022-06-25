from django.forms import PasswordInput
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.contrib import messages
from .authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
# from backend.account.authentication import create_access_token
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

            

# see if the above also works
# explore .save at beginning and at end if possible

# class LogoutView(APIView):
#     def post(request):
#         logout(request)
#         return redirect('home')


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
            raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))
        
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
    # permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            # print(refresh_token)
            response = Response()
            
            # refresh_token = request.data["refresh_token"]
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


# class LoginAPIView(APIView):
#     def post(self, request):
#         user = Account.objects.filter(email=request.data['email']).first()

#         if not user:
#             raise APIException('Invalid credentials')
    
#         access_token = create_access_token(user.pk)
#         refresh_token = create_refresh_token(user.pk)

#         response = Response()

#         response.set_cookie(key='refreshToken', value=refresh_token, httponly=True)
#         response.data = {
#             'token': access_token
#         }

#         return Response

        
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


# class UserAPIView(APIView):
    
#     def get(self, request):
#         auth = get_authorization_header(request).split()

#         print(auth)

#         if auth and len(auth) == 2:
#             # token = auth[1].decode('utf-8')
#             # id = decode_access_token(token)

#             response = Response()
#             response.data = {
#                 'user_id': id
#             }

#             return response
        
#         else:
#             return Response({"Invalid" : "Could not complete request"}, status=status.HTTP_404_NOT_FOUND)
#             user = Account.objects.filter(pk=id).first()

#             return Response(UserSerializer(user).data)

class RefreshAPIView(APIView):
   

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)

        return Response({
            "access_token": access_token
        })




class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        print(attrs)
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found in cookie \'refresh_token\'')

class CookieTokenObtainPairView(TokenObtainPairView):
  def finalize_response(self, request, response, *args, **kwargs):
    if response.data.get('refresh'):
        cookie_max_age = 3600 * 24 * 14 # 14 days
        response.set_cookie(
            key='refresh_token', 
            value=response.data['refresh'], 
            expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'], )
        del response.data['refresh']
    return super().finalize_response(request, response, *args, **kwargs)

class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14 # 14 days
            response.set_cookie(
                key='refresh_token', 
                value=response.data['refresh'], 
                expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],)
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer