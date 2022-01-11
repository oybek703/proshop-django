from django.urls import path
from . import views


urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='login_user'),
    path('users/profile', views.get_user_profile, name='user_profile'),
    path('users', views.get_users, name='users'),
    path('routes', views.get_routes, name='all_routes'),
    path('products/', views.get_products, name='products'),
    path('products/<str:pk>', views.get_product, name='product'),
]
