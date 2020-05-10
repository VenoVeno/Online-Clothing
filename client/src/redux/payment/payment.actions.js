import { PaymentActionTypes } from './payment.types';

export const paymentSuccess = (response) => ({
    type: PaymentActionTypes.PAYMENT_SUCCESS,
    payload: response
});