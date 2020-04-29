export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

// export const mergeRemoteCartItemsToState = (newCartItems, existingCartItems) => {
//     console.log("Cart Merger Called");
//     console.log(newCartItems);
//     console.log(existingCartItems);
//     return existingCartItems.map(existingCartItem =>
//         existingCartItem.id === newCartItems.id
//             ? [...existingCartItem, ...newCartItems]
//             : existingCartItems
//     )
// }

export const removeItemsFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(
            cartItem => cartItem.id !== cartItemToRemove.id
        )
    }
    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )
}