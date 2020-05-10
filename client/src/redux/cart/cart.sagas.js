import { takeLatest, call, all, put } from 'redux-saga/effects';
import { UserActionTypes } from '../user/user.types';

import { clearCart, fetchCartStart, fetchCartSuccess, fetchCartFailure, cartHistoryUpdateSuccess } from './cart.actions';
import { PaymentActionTypes } from '../payment/payment.types';

//Cart Add,del,update
import { CartActionTypes } from './cart.types';
import { getCurrentUser, cartItemUpdateDocument, cartItemDeleteDocument, cartClearDocument } from '../../firebase/firebase.utils';
import { selectCartItems } from './cart.selectors';
import { select } from 'redux-saga/effects';

//Cart Fetch
import { firestore, cartConcatWithFirebase } from '../../firebase/firebase.utils';

//Cart History Update
import { cartHistoryUpdateDocument } from '../../firebase/firebase.utils';

//CLEAR CART ON SIGN OUT AND ON PAYMENT SUCCESS
export function* cartClearOnReducer() {
    yield put(clearCart())
}

//FIRESTORE CART DELETION - CLEAR CART
export function* cartClearOnFirestore() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;

        yield cartClearDocument(userAuth);
    } catch (error) {
        yield console.log(error);
    }
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, cartClearOnReducer)
}

export function* onCartHistoryUpdateSuccess() {
    yield takeLatest(CartActionTypes.CART_HISTORY_UPDATE_SUCCESS, cartClearOnReducer)
    yield takeLatest(CartActionTypes.CART_HISTORY_UPDATE_SUCCESS, cartClearOnFirestore)
}

//FIRESTORE CART HISTORY UPDATION - UPDATE
export function* cartHistoryFirestore({ payload: { headers, data } }) {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        const cartItem = yield select(selectCartItems);
        yield cartHistoryUpdateDocument(userAuth, cartItem, { headers, data });
        yield put(cartHistoryUpdateSuccess());
    } catch (error) {
        yield console.log(error)
    }
}

export function* onPaymentSuccess() {
    yield takeLatest(PaymentActionTypes.PAYMENT_SUCCESS, cartHistoryFirestore)
}

//FIRESTORE CART ITEM UPDATION - ADD
export function* cartItemAddOnFirestore() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        const cartItem = yield select(selectCartItems);
        yield cartItemUpdateDocument(userAuth, cartItem);
    } catch (error) {
        yield console.log(error)
    }
}

//FIRESTORE CART ITEM UPDATION - REMOVE
export function* cartItemRemoveOnFirestore({ payload: { quantity, name }, type }) {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;

        if (quantity === 1 && type === "REMOVE_ITEM") {
            yield cartItemDeleteDocument(userAuth, name);
            return;
        }
        const cartItem = yield select(selectCartItems);
        yield cartItemUpdateDocument(userAuth, cartItem);
    } catch (error) {
        yield console.log(error)
    }
}

//FIRESTORE CART ITEM UPDATION - DELETION
export function* cartItemDeleteOnFirestore({ payload: { name } }) {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield cartItemDeleteDocument(userAuth, name);
    } catch (error) {
        yield console.log(error)
    }
}

export function* onCartItemUpdate() {
    yield takeLatest(CartActionTypes.ADD_ITEM, cartItemAddOnFirestore);
    yield takeLatest(CartActionTypes.REMOVE_ITEM, cartItemRemoveOnFirestore);
    yield takeLatest(CartActionTypes.CLEAR_ITEM_FROM_CART, cartItemDeleteOnFirestore);
}

//CART FETCH FROM FIRESTORE
export function* fetchCartAsync() {
    try {
        yield put(fetchCartStart());
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;

        const collectionRefUpdate = yield firestore.collection(`users/${userAuth.uid}/cart`);
        const snapShotBeforeUpdate = yield collectionRefUpdate.get();

        //Query from firestore before Update
        const cartItemsFirebaseBeforeUpdate = yield snapShotBeforeUpdate.docs.map(doc => doc.data());
        //Get The State before Update
        const cartItemsState = yield select(selectCartItems);
        yield cartConcatWithFirebase(userAuth, cartItemsState, cartItemsFirebaseBeforeUpdate);

        //To Query from firestore and update State
        const collectionRef = yield firestore.collection(`users/${userAuth.uid}/cart`);
        const snapShot = yield collectionRef.get();

        if (!snapShot.empty) {
            const cartItemsRemote = yield snapShot.docs.map(doc => doc.data());
            yield put(fetchCartSuccess(cartItemsRemote));
        } else {
            // console.log("No Cart data found To Retrieve")
            yield put(fetchCartFailure("No Cart data found To Retrieve"))
        }
    } catch (error) {
        yield put(fetchCartFailure(error));
    }
}

export function* onSignInSuccess() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchCartAsync)
}

export default function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
        call(onCartHistoryUpdateSuccess),
        call(onPaymentSuccess),
        call(onCartItemUpdate),
        call(onSignInSuccess)
    ])
}