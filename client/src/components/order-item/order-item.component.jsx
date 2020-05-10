import React from 'react';

import { ImageContainer, TextContainer, ItemInfoContainer } from './order-item.styles';

import { CheckOutItemContainer } from '../checkout-item/checkout-item.styles';

const OrderItem = ({ order }) => {
    const { cartItem, date, id, payment } = order;

    return (
        <div className="order-item-container">
            <h3>Your Orders From {date} </h3>
            {
                cartItem.map((cart, index) => {
                    const { imageUrl, name, quantity, price } = cart;
                    return (
                        <CheckOutItemContainer key={index}>
                            <ImageContainer>
                                <img src={imageUrl} alt="item" />
                            </ImageContainer>
                            <TextContainer>{name}</TextContainer>
                            <ItemInfoContainer>
                                <div>{quantity}</div>
                                <div>{price}</div>
                                <div>{quantity * price}</div>
                            </ItemInfoContainer>
                        </CheckOutItemContainer>
                    )
                })

            }

        </div>
    )
}

export default OrderItem;