import React from 'react';

import './custom-button.styles.scss';

//Receive this as children from the Sign In Component and print inside as {children}

const CustomButton = ({ children, isGoogleSign, inverted, ...otherButtonProps }) => (
    <button
        className={
            `${inverted ? 'inverted' : ''}${isGoogleSign ? 'google-sign-in' : ''} custom-button`
        }
        {...otherButtonProps}>
        {children}
    </button>
)

export default CustomButton;