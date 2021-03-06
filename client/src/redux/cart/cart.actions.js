import { CartActionTypes } from './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = (item) => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearItemFromCart = (item) => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART
});

export const fetchCartStart = () => ({
    type: CartActionTypes.FETCH_CART_START
});

export const fetchCartSuccess = (cartItem) => ({
    type: CartActionTypes.FETCH_CART_SUCCESS,
    payload: cartItem
});

export const fetchCartFailure = (errorMessage) => ({
    type: CartActionTypes.FETCH_CART_FAILURE,
    payload: errorMessage
});

export const cartHistoryUpdateSuccess = () => ({
    type: CartActionTypes.CART_HISTORY_UPDATE_SUCCESS
})