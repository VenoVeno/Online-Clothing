import React from 'react';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

// import './collection.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { CollectionPageContainer, CollectionPageTitle, CollectionPageItemsContainer } from './collection.styles'

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <CollectionPageContainer>
            <CollectionPageTitle>{title}</CollectionPageTitle>
            <CollectionPageItemsContainer>
                {
                    items.map(
                        (item) =>
                            (<CollectionItem key={item.id} item={item} />)
                    )
                }
            </CollectionPageItemsContainer>
        </CollectionPageContainer>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);