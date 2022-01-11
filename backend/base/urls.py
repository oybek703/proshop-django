from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
    path('users/login', TokenObtainPairView.as_view(), name='login_user'),
    path('products/', views.get_products, name='products'),
    path('products/<str:pk>', views.get_product, name='product')
]
