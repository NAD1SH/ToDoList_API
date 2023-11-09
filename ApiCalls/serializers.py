from rest_framework import serializers
from .models import ToDoList


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoList
        fields = ['id', 'Name', 'Complete']