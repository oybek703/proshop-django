from rest_framework import status
from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from ..models import Order, OrderItem, ShippingAddress, Product
from ..serializers import OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order(request):
    data = request.data
    # 1. Create new order
    order = Order.objects.create(
        user=request.user,
        payment_method=data['paymentMethod'],
        tax_price=data['taxPrice'],
        shipping_price=data['shippingPrice'],
        total_price=data['totalPrice']
    )
    order.save()
    # 2. Create order items
    for item in data['orderItems']:
        product = Product.objects.get(pk=item['_id'])
        order_item = OrderItem.objects.create(
            product=product,
            order=order,
            name=item['name'],
            qty=item['qty'],
            price=item['price'],
            image=product.image.url
        )
        order_item.save()
        product.count_in_stock -= item['qty']
        if product.count_in_stock <=0:
            product.count_in_stock = 0
        product.save()

    # 3. Create shipping address
    ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postal_code=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country'],
        shipping_price=data['shippingPrice']
    )
    # 5. Send order data
    serializer = OrderSerializer(order)
    return Response(serializer.data['_id'])


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    try:
        order = Order.objects.get(pk=pk)
        if request.user.is_staff or request.user == order.user:
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        else:
            message = {'detail': 'Permission denied.'}
            return Response(message, status=status.HTTP_403_FORBIDDEN)
    except Order.DoesNotExist:
        message = {'detail': 'Order does not exist.'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def pay_order(request, pk):
    payment_id = request.data['paymentId']
    try:
        order = Order.objects.get(pk=pk)
        order.is_paid = True
        order.paid_at = datetime.now()
        order.payment_id = payment_id
        order.save()
        serializer = OrderSerializer(order)
    except Order.DoesNotExist:
        message = {'detail': 'Order does not exist.'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data)
