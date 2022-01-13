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
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
