import { takeLatest, call, all, put } from 'redux-saga/effects';

import { UserActionTypes } from '../user/user.types';

import { fetchOrderSuccess, fetchOrderFailure, clearOrderHistory } from './order.actions';

import { getCurrentUser, getUserHistory, firestore } from '../../firebase/firebase.utils';
import { OrderActionTypes } from './order.types';

export function* getCartItems(userAuth, doc) {
    try {
        const CartItemRefSnapshot = yield firestore
            .collection(`users/${userAuth.uid}/UserHistory/${doc.id}/CartItem`)
            .get();
        const PaymentDetailsRefSnapShot = yield firestore
            .collection(`users/${userAuth.uid}/UserHistory/${doc.id}/Payment-details`)
            .get();

        // const modifyArray = [];
        // modifyArray.push(doc.date);
        const test = doc.date.toString();

        return {
            payment: PaymentDetailsRefSnapShot.docs.map((doc => { return doc.data() })),
            cartItem: CartItemRefSnapshot.docs.map((doc) => { return doc.data() }),
            id: doc.id,
            date: test
        };
    } catch (error) {
        console.log(error);
    }
}

export function* fetchOrderAsync() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            yield put(fetchOrderFailure("Guest User Has No Past Orders Found"));
            return;
        }
        const UHCollectionRef = firestore.collection(`users/${userAuth.uid}/UserHistory`);
        const UHCollectionSnapShot = yield UHCollectionRef.get();
        if (!UHCollectionSnapShot.empty) {
            const UserHistory = yield call(getUserHistory, UHCollectionSnapShot);
            const CartItem = yield all(UserHistory.map(doc => {
                return call(getCartItems, userAuth, doc)
            }))
            yield put(fetchOrderSuccess(CartItem));
        } else {
            console.log("No User History Found")
            yield put(fetchOrderFailure("No User History Found"));
        }
    } catch (error) {
        console.log(error)
        yield put(fetchOrderFailure(error));
    }
}

export function* onFetchOrderStart() {
    yield takeLatest([OrderActionTypes.FETCH_ORDER], fetchOrderAsync)
}

export function* clearOrderHistoryReducer() {
    try {
        yield put(clearOrderHistory())
    } catch (error) {
        console.log(error)
    }
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearOrderHistoryReducer)
}

export default function* orderSagas() {
    yield all([
        call(onFetchOrderStart),
        call(onSignOutSuccess)
    ])
}