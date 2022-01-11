from django.urls import path
from ..views import user_views as views

urlpatterns = [
    path('/', views.get_users, name='users'),
    path('/login', views.MyTokenObtainPairView.as_view(), name='login_user'),
    path('/register', views.register, name='register_user'),
    path('/profile', views.get_user_profile, name='user_profile'),
]

