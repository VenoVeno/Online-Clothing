import { OrderActionTypes } from './order.types';

const INITIAL_STATE = {
    orderItems: [],
    isOrderFetching: false,
    orderFetchErrorMessage: undefined
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OrderActionTypes.FETCH_ORDER:
            return {
                ...state,
                isOrderFetching: true
            }
        case OrderActionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orderItems: action.payload,
                isOrderFetching: false,
                orderFetchErrorMessage: null
            }
        case OrderActionTypes.FETCH_ORDER_FAILURE:
            return {
                ...state,
                isOrderFetching: false,
                orderFetchErrorMessage: action.payload
            }
        case OrderActionTypes.CLEAR_ORDER_HISTORY:
            return {
                ...state,
                orderItems: []
            }
        default:
            return state
    }
}

export default orderReducer;