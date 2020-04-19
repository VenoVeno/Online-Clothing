//Copy the files into App.js To Mount Shop data to firebase;

import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from './redux/user/user.selectors';

//TO PROGRAMATICALLY ADD SHOP DATA TO DATABASE;
import { selectCollectionsForPreview } from './redux/shop/shop.selectors'
import { addCollectionAndDocuments } from './firebase/firebase.utils';

class App extends React.Component {
    // constructor(props) {
    //   super(props);

    //   this.state = {
    //     currentUser: null
    //   }
    // }

    unsubscribeFromAuth = null;

    componentDidMount() {
        // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        // this.setState({
        //   currentUser: userAuth
        // });
        // // console.log(user);
        // createUserProfileDocument(userAuth);

        const { setCurrentUser } = this.props;

        //TO PROGRAMATICALLY ADD SHOP DATA TO DATABASE;
        //DESTRUCUTUTRING TO GET THE VALUE FROM MAPSTATETOPROPS FOR SHOP DATA INSERTION INTO FIRESTORE

        const { collectionsArray } = this.props;
        addCollectionAndDocuments('collections', collectionsArray)
        //TO SET ONLY SOME DATA TO FIRESTORE ANS SKIP OTHERS
        addCollectionAndDocuments('limited-collections',
            collectionsArray.map(({ title, items }) =>
                ({ title, items })
            ));

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {

                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                    // console.log("SnapShot from App js to set the state of app got from firebase db ",snapShot.data());

                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                    // },
                    // () => {
                    //   console.log("Current State => ", this.state)
                    // })
                })
            } else {
                // this.setState({ currentUser: userAuth })
                setCurrentUser(userAuth)
            }
        })
        // })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/signin'
                        // component={SignInAndSignUpPage} 
                        render={() =>
                            this.props.currentUser
                                ?
                                (<Redirect to='/' />)
                                :
                                (<SignInAndSignUpPage />)
                        }
                    />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
    , collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: user =>
        dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
