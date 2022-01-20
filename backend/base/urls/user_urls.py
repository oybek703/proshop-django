from django.urls import path
from ..views import user_views as views

urlpatterns = [
    path('', views.get_users, name='users'),
    path('login', views.MyTokenObtainPairView.as_view(), name='login_user'),
    path('register', views.register, name='register_user'),
    path('profile', views.get_user_profile, name='user_profile'),
    path('<str:pk>', views.get_user, name='get_user'),
    path('update/profile', views.update_profile, name='update_profile'),
    path('update/<str:pk>', views.update_user, name='update_user'),
    path('delete/<str:pk>', views.delete_user, name='delete_user'),
]

