from django.urls import path
from ..views import order_views as views

urlpatterns = [
    path('add', views.add_order, name='add_order'),
    path('my', views.get_user_orders, name='get_user_orders'),
    path('<str:pk>', views.get_order_by_id, name='get_order_by_id'),
    path('<str:pk>/pay', views.pay_order, name='pay_order')
]

