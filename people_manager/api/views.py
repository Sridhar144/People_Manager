import json
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from bson import ObjectId
from .serializers import PersonSerializer
import pymongo

# Accessing MongoDB Collection from settings
client = pymongo.MongoClient(settings.MONGO_DB_URI)
db = client[settings.MONGO_DB_NAME]
people_collection = db[settings.MONGO_COLLECTION]

def convert_object_id(data):
    if "_id" in data:
        data["id"] = str(data["_id"])
        del data["_id"]
    return data

# List all persons
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
@csrf_exempt
@require_http_methods(["GET", "POST"])
def list_create_persons(request):
    if request.method == "GET":
        persons = list(people_collection.find())
        for person in persons:
            person["_id"] = str(person["_id"])
        return JsonResponse(persons, safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            person_data = {
                "name": data["name"],
                "age": data["age"],
                "gender": data["gender"],
                "mobile_number": data["mobile_number"]
            }
            result = people_collection.insert_one(person_data)
            person_data["_id"] = str(result.inserted_id)
            return JsonResponse(person_data, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
@api_view(['GET'])
def list_people(request):
    people = list(people_collection.find())
    for person in people:
        convert_object_id(person)
    return Response(people)

# Create a person
@api_view(['POST'])
def create_person(request):
    serializer = PersonSerializer(data=request.data)
    if serializer.is_valid():
        person = serializer.data
        result = people_collection.insert_one(person)
        person['id'] = str(result.inserted_id)
        return Response(person, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update a person
@api_view(['PUT'])
def update_person(request, id):
    serializer = PersonSerializer(data=request.data)
    if serializer.is_valid():
        person_data = serializer.data
        people_collection.update_one({'_id': ObjectId(id)}, {"$set": person_data})
        return Response(person_data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete a person
@api_view(['DELETE'])
def delete_person(request, id):
    result = people_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count:
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'error': 'Person not found'}, status=status.HTTP_404_NOT_FOUND)
