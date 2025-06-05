from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

class Boat(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    boat_type = models.CharField(max_length=100)
    price_per_hour = models.DecimalField(max_digits=8, decimal_places=2)
    available = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE)
    date_from = models.DateTimeField()
    date_to = models.DateTimeField()
    with_skipper = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} → {self.boat.name} ({self.date_from.date()})"
