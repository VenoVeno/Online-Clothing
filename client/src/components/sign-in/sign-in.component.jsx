import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

// import './sign-in.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT

import { SignInContainer, SignInTitle, SignInButtonGroup } from './sign-in.styles';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions.js';

// class SignIn extends React.Component {
// constructor(props) {
//     super(props);
//     this.state = { email: '', password: '' }
// }

const SignIn = ({ googleSignInStart, emailSignInStart }) => {

    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const { emailSignInStart } = this.props;
        // const { email, password } = this.state;

        const { email, password } = userCredentials;
        emailSignInStart(email, password);

        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({ email: '', password: '' })
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const handleChange = (e) => {
        // console.log("Target Value : ",e.target.value," Target Name :",e.target.name);

        const { value, name } = e.target;
        // this.setState({
        //     [name]: value
        // })
        setUserCredentials({
            ...userCredentials, //Similar to Actions return type
            [name]: value
        })
        // console.log("State",this.state[name])
    }

    // const { googleSignInStart } = this.props;
    return (
        <SignInContainer>
            <SignInTitle className="sign-in-header title">I already have an account</SignInTitle>
            <span>Sign in with Your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    type='email'
                    name='email'
                    label='Email'
                    handleChange={handleChange}
                    value={email}
                    required
                />

                <FormInput
                    type='password'
                    name='password'
                    label='Password'
                    handleChange={handleChange}
                    value={password}
                    required
                />

                {/* <CustomButton type="submit" child="Submit Form" />
                    or Pass this as Children to CustomButton Component */}
                <SignInButtonGroup>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </SignInButtonGroup>

            </form>
        </SignInContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);
