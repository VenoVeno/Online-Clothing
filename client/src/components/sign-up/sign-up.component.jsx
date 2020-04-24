import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

// import './sign-up.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

import { signUpStart } from '../../redux/user/user.actions';

// class SignUp extends React.Component {
// constructor(props) {
//     super(props);
//     this.state = { displayName: '', email: '', password: '', confirmPassword: '' }
// }
const SignUp = ({ signUpStart }) => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    //DESTRUCTURING
    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const { displayName, email, password, confirmPassword } = this.state;
        // const { signUpStart } = this.props;

        if (password !== confirmPassword) {
            alert("Password don't match")
            return;
        }
        signUpStart({ email, password, displayName });

        // try {
        //     const { user } = await auth.createUserWithEmailAndPassword(email, password);
        //     await createUserProfileDocument(user, { displayName });
        //     this.setState(
        //         {
        //             displayName: '',
        //             email: '',
        //             password: '',
        //             confirmPassword: ''
        //         }
        //     );
        // } catch (error) {
        //     console.error("Here", error.message)
        // }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(this.state[name])
        // this.setState({ [name]: value });
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    // const { displayName, email, password, confirmPassword } = this.state;
    return (
        <SignUpContainer>
            <SignUpTitle>I do not have an account</SignUpTitle>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    onChange={handleChange}
                    value={displayName}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={email}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={password}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    onChange={handleChange}
                    value={confirmPassword}
                    label='Confirm Password'
                    required
                />

                <CustomButton type='submit'>SIGN UP</CustomButton>

            </form>
        </SignUpContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);