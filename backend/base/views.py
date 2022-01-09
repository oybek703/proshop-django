from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Cart, CartItem
from .serializers import ProductSerializer


def get_cart_id(request):
    cart_id = request.session.session_key
    if not cart_id:
        cart_id = request.session.create()
    return cart_id


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all().order_by('price')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def add_to_cart(request):
    product_id = request.data['product_id']
    qty = request.data['qty']
    product = Product.objects.get(pk=product_id)
    if request.user.is_authenticated:
        try:
            cart_item = CartItem.objects.get(product=product, user=request.user)
            cart_item.qty += 1
        except CartItem.DoesNotExist:
            cart_item = CartItem.objects.create(product=product, user=request.user,
                                                qty=1)
        cart_item.save()
    else:
        try:
            cart = Cart.objects.get(cart_id=get_cart_id(request))
        except Cart.DoesNotExist:
            cart = Cart.objects.create(cart_id=get_cart_id(request))
        cart.save()
        print(cart.cart_id)
        try:
            cart_item = CartItem.objects.get(product=product, cart=cart)
            cart_item.qty += 1
            cart_item.save()
        except CartItem.DoesNotExist:
            cart_item = CartItem.objects.create(cart=cart, product=product, qty=qty)
        cart_item.save()
    return Response({})
