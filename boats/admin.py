from django.contrib import admin
from .models import User, Boat, Reservation

admin.site.register(User)
admin.site.register(Boat)
admin.site.register(Reservation)
