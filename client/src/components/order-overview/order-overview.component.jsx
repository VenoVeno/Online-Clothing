import React from 'react';

import OrderItem from '../order-item/order-item.component';

import './order-overview.styles.scss';
import { CheckoutPageContainer } from '../../pages/checkout/checkout.styles';
import { WarningContainer } from '../../pages/checkout/checkout.styles';

const OrderOverview = ({ orders }) => {
    if (orders.length === 0) {
        return (
            <WarningContainer>Your Order Seems To Be Empty! Place Some Order You Needed!</WarningContainer>
        )
    } else {
        return (
            <CheckoutPageContainer>
                {
                    orders.map((order, index) => (
                        <OrderItem key={index} order={order} />
                    ))
                }
            </CheckoutPageContainer>
        )
    }
}

export default OrderOverview;