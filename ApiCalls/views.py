from django.shortcuts import render
from .models import ToDoList
from rest_framework.response import Response
from rest_framework import status
from .serializers import ToDoSerializer
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['GET'])
def showList(request):
    To_Do_List = ToDoList.objects.all().order_by('-id')
    serializer = ToDoSerializer(To_Do_List, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createList(request):
    serializer = ToDoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('New List Has Been Created')
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateList(request, id):
    To_Do_List = ToDoList.objects.get(pk=id)
    serializer = ToDoSerializer(instance=To_Do_List, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Your List Has Been Updated')
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listDetail(request, id):
    To_Do_List = ToDoList.objects.get(pk=id)
    serializer = ToDoSerializer(To_Do_List)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteList(request, id):
    To_Do_List = ToDoList.objects.get(pk=id)
    To_Do_List.delete()
    return Response('Your List Has Been Deleted')


