from django.urls import path
from ..views import product_views as views


urlpatterns = [
    path('', views.get_products, name='products'),
    path('all', views.get_all_products, name='get_all_products'),
    path('top', views.get_top_products, name='get_top_products'),
    path('update', views.update_product, name='update_product'),
    path('create', views.create_product, name='create_product'),
    path('create_review', views.create_review, name='create_review'),
    path('<str:pk>', views.get_product, name='product'),
    path('upload/<str:pk>', views.upload_product_image, name='upload_product_image'),
    path('delete/<str:pk>', views.delete_product, name='delete_product'),
]
