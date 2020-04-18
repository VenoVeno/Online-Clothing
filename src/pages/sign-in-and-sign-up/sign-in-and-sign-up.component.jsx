import React from 'react';

// import './sign-in-and-sign-up.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { SignInAndSignUpPageContainer } from './sign-in-and-sign-up.styles';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAndSignUpPage = () => (
    <SignInAndSignUpPageContainer>
        <SignIn />
        <SignUp />
    </SignInAndSignUpPageContainer>
)

export default SignInAndSignUpPage;