import email
from unicodedata import name
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# create User Manager from scratch
class MyAccountManager(BaseUserManager):
    
    def create_user(self, email, username, name, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have an username")
        if not name:
            raise ValueError("Users must have a name")
        
        user = self.model(
                email=self.normalize_email(email),
                username = username,
                name = name,
            )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, name, password):
        user = self.create_user(
                email=self.normalize_email(email),
                username = username,
                name = name,
                password=password,
            )
        
        # set additional admin properties
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# create user from scratch
class Account(AbstractBaseUser):
    # custom fields
    email                   = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username                = models.CharField(max_length=30, unique=True)
    name                    = models.CharField(max_length=50)
    
    # required user fields
    date_joined				= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login				= models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin				= models.BooleanField(default=False)
    is_active				= models.BooleanField(default=True)
    is_staff				= models.BooleanField(default=False)
    is_superuser			= models.BooleanField(default=False)

    # use email as username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']

    # set account manager
    objects = MyAccountManager()

    def __str__(self):
	    return self.email

	# For checking permissions. to keep it simple all admin have ALL permissons
    def has_perm(self, perm, obj=None):
        return self.is_admin

	# Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY
    def has_module_perms(self, app_label):
        return True