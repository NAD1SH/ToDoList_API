from django.urls import path
from .import views


urlpatterns = [
    path('show_list/', views.showList, name='show_list'),
    path('create_list/', views.createList, name='create_list'),
    path('update_list/<int:id>', views.updateList, name='update_list'),
    path('list_detail/<int:id>', views.listDetail, name='list_detail'),
    path('delete_list/<int:id>', views.deleteList, name='delete_list'),
]    
