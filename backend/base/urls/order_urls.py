from django.urls import path
from ..views import order_views as views

urlpatterns = [
    path('add', views.add_order, name='add_order'),
]

