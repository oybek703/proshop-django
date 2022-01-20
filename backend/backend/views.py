from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.conf import settings


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def paypal(request):
    client_id = settings.PAYPAL_CLIENT_ID
    return Response({'client_id': client_id})


@api_view(['GET'])
def index(request):
    return Response({'detail': 'API is working...'})
