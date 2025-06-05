from . import views
from django.urls import path
from django.views.generic import TemplateView
from .views import (
        RegisterView, LoginView,
    BoatListCreateView, BoatDetailView,
    ReservationListCreateView, ReservationDetailView,
    current_user_info,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('boats/', BoatListCreateView.as_view(), name='boat-list'),
    path('boats/<int:pk>/', BoatDetailView.as_view(), name='boat-detail'),
    path('reservations/', ReservationListCreateView.as_view(), name='reservation-list'),
    path('reservations/<int:pk>/', ReservationDetailView.as_view(), name='reservation-detail'),
    path('', TemplateView.as_view(template_name="index.html"), name='frontend'),
    path('api-auth/user/', current_user_info),
    path('reservations/all/', views.all_reservations),


]
