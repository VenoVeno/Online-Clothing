import React from 'react';
import { withRouter } from 'react-router-dom';

// import './menu-item.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { MenuItemContainer, MenuItemBackgroundImageContainer, MenuItemContentContainer, MenuItemContentTitle, MenuItemContentSubtitle } from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => (

    <MenuItemContainer size={size}
        onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <MenuItemBackgroundImageContainer backgroundImageUrl={imageUrl} />
        <MenuItemContentContainer>
            <MenuItemContentTitle>{title}</MenuItemContentTitle>
            <MenuItemContentSubtitle>SHOP NOW</MenuItemContentSubtitle>
        </MenuItemContentContainer>
    </MenuItemContainer>
)

export default withRouter(MenuItem);