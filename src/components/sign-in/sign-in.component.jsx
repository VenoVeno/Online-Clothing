import React from 'react';

import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

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
            <div className="sign-in">
                <h2 className="sign-in-header title">I already have an account</h2>
                <span className="sign-in-sub-header">Sign in with Your email and password</span>

                <form className="sign-in-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        name='email'
                        id='email'
                        label='Email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        required
                    />

                    <FormInput
                        type='password'
                        name='password'
                        id='password'
                        label='Password'
                        handleChange={this.handleChange}
                        value={this.state.password}
                        required
                    />

                    {/* <CustomButton type="submit" child="Submit Form" />
                    or Pass this as Children to CustomButton Component */}
                    <div className="sign-in-button-group">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSign>Sign In With Google</CustomButton>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignIn;
