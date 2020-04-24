import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component'

// import './collection-preview.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { CollectionPreviewContainer, CollectionPreviewTitleContainer, PreviewContainer } from './collection-preview.styles'

const CollectionPreview = ({ title, items, history, match, routeName }) => (
    <CollectionPreviewContainer>
        <CollectionPreviewTitleContainer
            onClick={() => history.push(`${match.path}/${routeName}`)}>
            {title}
        </CollectionPreviewTitleContainer>
        <PreviewContainer>
            {
                items
                    .filter((item, index) => index < 4)
                    .map((item) => (
                        <CollectionItem key={item.id} item={item} />
                    ))
            }
        </PreviewContainer>
    </CollectionPreviewContainer>
)

export default withRouter(CollectionPreview);