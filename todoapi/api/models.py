from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ToDo(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="todos",
        null=True,
        blank=True
    )

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    iscompleted = models.BooleanField(default=False)
    priority = models.CharField(max_length=10,choices=[('LOW','low'),('MEDIUM','medium'),('HIGH','high')],default='MEDIUM')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateField(null=True,blank=True)