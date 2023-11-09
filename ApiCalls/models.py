from django.db import models

# Create your models here.


class ToDoList(models.Model):
    Name = models.CharField(max_length=200)
    Complete = models.BooleanField(default=False, null=True, blank=True)

    class Meta:
        verbose_name_plural = "ToDoList"
