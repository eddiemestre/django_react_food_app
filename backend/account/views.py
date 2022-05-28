from django.forms import PasswordInput
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.contrib import messages
from .serializers import ChangePasswordSerializer, UserRegistration, UpdateUserSerializer
from .models import Account
from rest_framework.response import Response
from rest_framework import generics, authentication, exceptions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken, BlacklistedToken
from rest_framework import status
# Create your views here.

# inherits from CreateAPIView which has a built in post function
class RegistrationAPI(generics.CreateAPIView):
    queryset = Account.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistration
    # def post(request):
        # serializer_class = UserRegistration(request)
        # if serializer_class.is_valid():
        #     email = serializer_class.validated_data['email']
        #     username = serializer_class.validated_data['username']
        #     password = serializer_class.validated_data['password1']
        #     password2 = serializer_class.validated_data['password2']

        #     if password == password2:
        #         if Account.objects.filter(username=username).exists():
        #             messages.error(request, 'An account with this username already exists!')
        #             # redirect
        #             return redirect('register')
        #         if Account.objects.filter(email=email).exists():
        #             messages.error(request, 'An account with this email already exists!')
        #             # redirect
        #             return redirect('register')
        #         account = authenticate(email=email, username=username, password=password)
        #         serializer_class.save()
        #     login(request, account)
        #     return redirect('home')

            

# see if the above also works
# explore .save at beginning and at end if possible

class LogoutView(APIView):
    def post(request):
        logout(request)
        return redirect('home')


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

# class AuthenticationView(APIView):
#     authentication_classes = (UserAuthentication)
    
#     def post(self, request, format=None):

#         user = authenticate(request, email=)
#         return Response(content)



# class MyObtainTokenPairView(TokenObtainPairView):
#     permission_classes = (AllowAny,)
#     serializer_class = MyTokenObtainPairSerializer

class ChangePasswordView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer


class UpdateProfileView(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)

        return Response(status=status.HTTP_205_RESET_CONTENT)