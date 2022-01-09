from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name='products'),
    path('products/<str:pk>', views.get_product, name='product'),
    path('cart', views.add_to_cart, name='cart')
]
