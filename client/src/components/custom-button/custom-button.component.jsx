import React from 'react';

// import './custom-button.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { CustomButtonContainer } from './custom-button.styles';

//Receive this as children from the Sign In Component and print inside as {children}
//And also no need of className while using STYLED COMPONENT

const CustomButton = ({ children, ...props }) => (
    <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
)

export default CustomButton;