from django.contrib import admin
from .models import *


# Register your models here.

class ToDoAdminModel(admin.ModelAdmin):
    list_display = ['Name', 'Complete']

admin.site.register(ToDoList, ToDoAdminModel)