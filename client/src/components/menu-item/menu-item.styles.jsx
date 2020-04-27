import styled, { css } from 'styled-components';

const menuItemLarge = css`
    height: 380px;
`;

const menuItemSmall = css`
    height: 240px;
`;

const getMenuItemHeight = (props) => {
    if (props.size) {
        return menuItemLarge;
    } else {
        return menuItemSmall;
    }
}

export const MenuItemBackgroundImageContainer = styled.div`
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    background-image : ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
`;

export const MenuItemContentContainer = styled.div`
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: whitesmoke;
    opacity: 0.7;
    border: none;
    position: absolute;
`;

export const MenuItemContainer = styled.div`
    min-width: 30%;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    overflow: hidden;

    ${getMenuItemHeight};
    
    &:hover {
        cursor: pointer;

        ${MenuItemBackgroundImageContainer}{
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25,0.45,0.45,0.95);
        }

        ${MenuItemContentContainer} {
            opacity: 0.9;
        }
    }

    &:first-child {
        margin-right: 7.5px;
    }

    &:last-child {
        margin-left: 7.5px;
    }

    @media screen and (max-width:800px){
        height: 200px;
    }
`;



export const MenuItemContentTitle = styled.h1`
    font-weight: bold;
    margin-bottom: 6px;
    font-size: 22px;
    color: #4a4a4a;
    text-transform: uppercase;
`;

export const MenuItemContentSubtitle = styled.span`
    font-weight: lighter;
    font-size: 16px;
`;