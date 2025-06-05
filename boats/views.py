from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Boat, Reservation
from .serializers import UserSerializer, BoatSerializer, ReservationSerializer
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user = User.objects.filter(username=request.data.get("username")).first()
        if user and user.check_password(request.data.get("password")):
            refresh = RefreshToken.for_user(user)
            return Response({"token": str(refresh.access_token)})
        return Response({"error": "Invalid credentials"}, status=401)

class BoatListCreateView(generics.ListCreateAPIView):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [IsAuthenticated()]

class BoatDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer

    def get_permissions(self):
        return [IsAdminUser()]

class ReservationListCreateView(generics.ListCreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        boat = serializer.validated_data['boat']
        date_from = serializer.validated_data['date_from']
        date_to = serializer.validated_data['date_to']

        conflict_exists = Reservation.objects.filter(
            boat=boat,
            date_from__lt=date_to,
            date_to__gt=date_from
        ).exists()

        if conflict_exists:
            raise serializers.ValidationError("Ten termin jest już zajęty dla tej łodzi.")

        serializer.save(user=self.request.user)

class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Reservation.objects.all()
        return Reservation.objects.filter(user=user)

def index(request):
    return render(request, "index.html")


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user_info(request):
    user = request.user
    return Response({
        'username': user.username,
        'is_superuser': user.is_superuser,
    })

@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def all_reservations(request):
    reservations = Reservation.objects.all().select_related('boat', 'user')
    data = [
        {
            "id": res.id,
            "boat_name": res.boat.name,
            "username": res.user.username,
            "date_from": res.date_from,
            "date_to": res.date_to
        }
        for res in reservations
    ]
    return Response(data)
