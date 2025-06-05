from rest_framework import serializers
from .models import User, Boat, Reservation
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'is_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class BoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boat
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    boat_name = serializers.CharField(source='boat.name', read_only=True)
    boat_price_per_day = serializers.DecimalField(source='boat.price_per_hour', max_digits=8, decimal_places=2, read_only=True)
    cost = serializers.SerializerMethodField()

    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['user']

    def get_cost(self, obj):
        delta = obj.date_to.date() - obj.date_from.date()
        days = delta.days
        return float(obj.boat.price_per_hour) * days


