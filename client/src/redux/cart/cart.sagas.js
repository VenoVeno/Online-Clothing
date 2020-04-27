import { takeLatest, call, all, put } from 'redux-saga/effects';
import { UserActionTypes } from '../user/user.types';

import { clearCart } from './cart.actions'
import { PaymentActionTypes } from '../payment/payment.types';

export function* clearCartOnAction() {
    yield put(clearCart())
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnAction)
}

export function* onPaymentSuccess() {
    yield takeLatest(PaymentActionTypes.PAYMENT_SUCCESS,clearCartOnAction)
}

export default function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
        call(onPaymentSuccess)
    ])
}