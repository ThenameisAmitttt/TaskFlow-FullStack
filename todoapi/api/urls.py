from django.urls import path,include
from .views import ToDoViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'todolist',ToDoViewSet)


urlpatterns = [

    path('',include(router.urls)),
]