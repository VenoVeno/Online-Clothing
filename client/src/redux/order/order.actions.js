import { OrderActionTypes } from './order.types';

export const fetchOrder = () => ({
    type: OrderActionTypes.FETCH_ORDER
});

export const fetchOrderSuccess = (orders) => ({
    type: OrderActionTypes.FETCH_ORDER_SUCCESS,
    payload: orders
});

export const fetchOrderFailure = (error) => ({
    type: OrderActionTypes.FETCH_ORDER_FAILURE,
    payload: error
});

export const clearOrderHistory = () => ({
    type: OrderActionTypes.CLEAR_ORDER_HISTORY
})