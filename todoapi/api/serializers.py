from rest_framework import serializers
from .models import ToDo
from django.contrib.auth.models import User
from django.utils import timezone

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = [
        "id",
        "user",
        "title",
        "description",
        "iscompleted",
        "priority",
        "created_at",
        "updated_at",
        "due_date",
        ]
        read_only_fields = ["user"]

    def validate_title(self,value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Title cannot be empty"
            )
        return value

    def validate_due_date(self,value):
        if value < timezone.localdate():
            raise serializers.ValidationError(
                "Due Date cannot be in past"
            )

        return value
        
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields= ["username","password"]
        extra_kwargs = {
            "password":{"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data["username"],
            password = validated_data["password"]
        )
        return user