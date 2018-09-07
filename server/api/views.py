from django.shortcuts import render
from rest_framework import permissions, views, response, status, generics
import braintree

# sandbox keys
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="xx3f4kgbr7k3ghph",
        public_key="62jfn4ftytykych4",
        private_key="92c1c7385d37b05cef1bcea4bf6c9000"
    )
)

class GenerateToken(views.APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        token = gateway.client_token.generate()
        return response.Response({
            'token': token,
        }, status=status.HTTP_200_OK)


class Checkout(views.APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        nonce_from_the_client = request.data.get('nonce')

        result = gateway.transaction.sale({
            "amount": "10.00",
            "payment_method_nonce": nonce_from_the_client,
            "options": {
                "submit_for_settlement": True
            }
        })
        transaction = result.transaction

        # only handle Successful Result
        return response.Response({
            'success': result.is_success,
            'transaction_status': transaction.status,
            'use_credit_card': transaction.payment_instrument_type == braintree.PaymentInstrumentType.CreditCard,
            'use_paypal': transaction.payment_instrument_type == braintree.PaymentInstrumentType.PayPalAccount,
        }, status=status.HTTP_200_OK)
