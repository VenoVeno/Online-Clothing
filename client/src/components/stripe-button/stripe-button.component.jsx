import React from 'react';
import { connect } from 'react-redux';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { paymentSuccess } from '../../redux/payment/payment.actions';

const StripeCheckoutButton = ({ price, paymentSuccess }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_XeniuFAFIweSrH2pXBVbAb07000LYhZyhP';
    const onToken = (token) => {
        //First Parameter to know what kind of Req
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
            .then(response => {
                paymentSuccess();
                alert('Payment Successful');
            })
            .catch(err => {
                console.log('Payment Error: ', err);
                alert('Payment Could not be processed! Please Use The Test Credit Card!')
            })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Apparel Shop Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Net Payable Amount is ₹${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            currency="INR"
            token={onToken}
            allowRememberMe
            stripeKey={publishableKey}
        />
    )
}

const mapDispatchToProps = (dispatch) => ({
    paymentSuccess: () => dispatch(paymentSuccess())
})

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);