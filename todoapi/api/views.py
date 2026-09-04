from django.shortcuts import render
from .models import ToDo
from .serializers import ToDoSerializer,RegisterSerializer
from rest_framework import viewsets,generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny

# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ToDoViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all().order_by('-created_at')
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ToDo.objects.filter(
            user=self.request.user
        ).order_by('-created_at')
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)