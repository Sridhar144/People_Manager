from rest_framework import serializers

class PersonSerializer(serializers.Serializer):
    id = serializers.CharField(required=False)  # MongoDB Document ID
    name = serializers.CharField(max_length=100)
    age = serializers.IntegerField()
    gender = serializers.CharField(max_length=10)
    mobile_number = serializers.CharField(max_length=15)
