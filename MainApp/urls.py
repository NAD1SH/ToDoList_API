from django.urls import path
from .import views


urlpatterns = [
    path('', views.index),
    path('view_list', views.viewList, name='view_list'),
    
]
