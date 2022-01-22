from django.urls import path
from ..views import order_views as views

urlpatterns = [
    path('add', views.add_order, name='add_order'),
    path('my', views.get_user_orders, name='get_user_orders'),
    path('all', views.get_all_orders, name='get_all_orders'),
    path('<str:pk>', views.get_order_by_id, name='get_order_by_id'),
    path('<str:pk>/pay', views.pay_order, name='pay_order'),
    path('<str:pk>/deliver', views.mark_as_delivered, name='mark_as_delivered')
]

