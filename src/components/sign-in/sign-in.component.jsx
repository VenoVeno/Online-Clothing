import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

// import './sign-in.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { SignInContainer, SignInTitle, SignInButtonGroup } from './sign-in.styles';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (e) => {
        // console.log("Target Value : ",e.target.value," Target Name :",e.target.name);

        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
        // console.log("State",this.state[name])
    }

    render() {
        return (
            <SignInContainer>
                <SignInTitle className="sign-in-header title">I already have an account</SignInTitle>
                <span>Sign in with Your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        name='email'
                        label='Email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        required
                    />

                    <FormInput
                        type='password'
                        name='password'
                        label='Password'
                        handleChange={this.handleChange}
                        value={this.state.password}
                        required
                    />

                    {/* <CustomButton type="submit" child="Submit Form" />
                    or Pass this as Children to CustomButton Component */}
                    <SignInButtonGroup>
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </SignInButtonGroup>

                </form>
            </SignInContainer>
        )
    }
}

export default SignIn;
