import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

// import './sign-up.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Password don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            this.setState(
                {
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }
            );
        } catch (error) {
            console.error("Here", error.message)
        }

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(this.state[name])
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <SignUpContainer>
                <SignUpTitle>I do not have an account</SignUpTitle>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        onChange={this.handleChange}
                        value={displayName}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        onChange={this.handleChange}
                        value={email}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        onChange={this.handleChange}
                        value={password}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        onChange={this.handleChange}
                        value={confirmPassword}
                        label='Confirm Password'
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>
            </SignUpContainer>
        )
    }
}

export default SignUp;