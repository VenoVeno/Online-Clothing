import { all, call } from 'redux-saga/effects';

import cartSagas from './cart/cart.sagas';
import shopSagas from './shop/shop.sagas';
import userSagas from './user/user.sagas';
import orderSagas from './order/order.sagas';

export default function* rootSaga() {
    yield all([
        call(cartSagas),
        call(userSagas),
        call(shopSagas),
        call(orderSagas)
    ])
}