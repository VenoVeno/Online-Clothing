import React from 'react';
import { connect } from 'react-redux';

//IMPORTED IN COLLECTION-ITEM STYLES JSX
// import CustomButton from '../custom-button/custom-button.component';
// import './collection-item.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { CollectionItemContainer, CollectionItemBackgroundImage, CollectionFooterContainer, NameContainer, PriceContainer, AddToCartButton } from './collection-item.styles'

import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
        <CollectionItemContainer>
            <CollectionItemBackgroundImage backgroundImageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>{price}</PriceContainer>
            </CollectionFooterContainer>
            <AddToCartButton onClick={() => addItem(item)} inverted>ADD TO CART</AddToCartButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);