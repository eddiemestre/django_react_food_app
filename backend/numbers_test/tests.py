from django.test import TestCase
from .models import NumberModel
from .serializers import NumberSerializer

# Create your tests here.

testModel = NumberModel(
    number=0,
    test_attr = 5
)
testModel.save()

serializer = NumberSerializer(testModel)
serializer.data