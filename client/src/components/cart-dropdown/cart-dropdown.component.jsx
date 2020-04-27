import React from 'react';

// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';

// IMPORTED IN CART-DROPDOWN STYLES JSX
// import CustomButton from "../custom-button/custom-button.component";

// import './cart-dropdown.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { CartDropdownContainer, CartItemsContanier, EmptyMessageContainer, CartDropdownButton } from './cart-dropdown.styles'

// import { selectCartItems } from '../../redux/cart/cart.selectors';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
        <CartItemsContanier>
            {
                cartItems.length
                    ?
                    (
                        cartItems.map(cartItem => (
                            <CartItem key={cartItem.id} item={cartItem} />
                        ))
                    ) : (
                        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                    )
            }
        </CartItemsContanier>
        <CartDropdownButton
            onClick={
                () => {
                    history.push('/checkout')
                    dispatch(toggleCartHidden())
                }
            }
        >GO TO CHECKOUT</CartDropdownButton>
        {/* <Link to='/checkout'>GO TO CHECKOUT</Link> */}
    </CartDropdownContainer>
);

// const mapStateToProps = createStructuredSelector({
//     cartItems: selectCartItems
// })

// export default withRouter(connect(mapStateToProps)(CartDropdown));

export default CartDropdown;