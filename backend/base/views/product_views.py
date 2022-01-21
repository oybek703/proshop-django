from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from ..models import Product, OrderItem, Review
from ..serializers import ProductSerializer


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all().order_by('price')
    keyword = request.GET.get('keyword', '')
    products = products.filter(name__icontains=keyword)
    page = request.GET.get('page', 1)
    paginator = Paginator(products, 3)
    try:
        products = paginator.page(page)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    except PageNotAnInteger:
        products = paginator.page(1)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def get_all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_top_products(request):
    products = Product.objects.filter().order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def upload_product_image(request, pk):
    new_image = request.FILES.get('image')
    product = Product.objects.get(pk=pk)
    product.image = new_image
    product.save()
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request):
    try:
        product = Product.objects.get(pk=request.data['productId'])
        product.name = request.data['name']
        product.price = request.data['price']
        product.brand = request.data['brand']
        product.category = request.data['category']
        product.description = request.data['description']
        product.count_in_stock = request.data['countInStock']
        product.save()
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    try:
        image = request.FILES.get('image')
        product = Product.objects.create(
            user=request.user,
            name=request.data['name'],
            price=request.data['price'],
            brand=request.data['brand'],
            category=request.data['category'],
            description=request.data['description'],
            count_in_stock=request.data['countInStock'],
        )
        if image:
            product.image = image
        product.save()
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        product.delete()
        return Response({'detail': f'Product {pk} deleted.'})
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request):
    # 1. Get product
    try:
        product = Product.objects.get(pk=request.data['productId'])
        # 2. Find order item of user for this product and check paid status
        order_exists_and_paid = OrderItem.objects.filter(
            product=product,
            order__user=request.user,
            order__is_paid=True).exists()
        if order_exists_and_paid:
            # 3. Check if user has already reviewed this product
            review_exists = Review.objects.filter(product=product, user=request.user).exists()
            if review_exists:
                # 3.a if exists update review
                review = Review.objects.get(product=product, user=request.user)
                review.rating = request.data['rating']
                review.comment = request.data['comment']
                review.save()
            else:
                # 4. If not reviewed create review and send product
                new_review = Review.objects.create(
                    user=request.user,
                    product=product,
                    rating=request.data['rating'],
                    comment=request.data['comment']
                )
                product.num_reviews += 1
                product.save()
                new_review.save()
            reviews = product.reviews.all()
            total = 0
            for review in list(reviews):
                total += review.rating
            rating = total / len(reviews)
            product.rating = rating
            product.save()
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        else:
            return Response({'detail': 'You have not purchased this product.'}, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
        return Response({'detail': 'Product does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
