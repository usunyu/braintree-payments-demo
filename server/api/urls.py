from django.urls import path, include
from api import views

urlpatterns = [
    path('generate_token/', views.GenerateToken.as_view(), name='generate_token'),
    path('checkout/', views.Checkout.as_view(), name='checkout'),
]
