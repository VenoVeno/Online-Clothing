import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

// import './checkout.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { CheckoutPageContainer, CheckoutHeaderContainer, CheckoutHeaderBlockContainer, CheckoutTotalContainer, TestCardContainer } from './checkout.styles';

const CheckoutPage = ({ cartItems, total }) => (
    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <CheckoutHeaderBlockContainer><span>Product</span></CheckoutHeaderBlockContainer>
            <CheckoutHeaderBlockContainer><span>Description</span></CheckoutHeaderBlockContainer>
            <CheckoutHeaderBlockContainer><span>Quantity</span></CheckoutHeaderBlockContainer>
            <CheckoutHeaderBlockContainer><span>Price</span></CheckoutHeaderBlockContainer>
            <CheckoutHeaderBlockContainer><span>Remove</span></CheckoutHeaderBlockContainer>
        </CheckoutHeaderContainer>

        {
            cartItems.map(cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )
        }

        <CheckoutTotalContainer><span>TOTAL : ${total} </span></CheckoutTotalContainer>
        <TestCardContainer>
            *Please Use the Test-Credit-Card for Payments
            <br />
            4242 4242 4242 4242 - Exp 01/21 - CVV 123
        </TestCardContainer>
        <StripeCheckoutButton price={total} />
    </CheckoutPageContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);