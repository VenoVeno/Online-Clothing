import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import './App.css';
import { GlobalStyleContainer } from './global.styles';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import OrderPage from './pages/orderpage/orderpage.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// import CheckoutPage from './pages/checkout/checkout.component';
import CheckoutContainer from './pages/checkout/checkout.container';

import Header from './components/header/header.component'

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { setCurrentUser } from "./redux/user/user.actions";

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// class App extends React.Component {
// checkUserSession is a property Function
const App = ({ checkUserSession, currentUser }) => {
  // unsubscribeFromAuth = null;

  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
  // const { setCurrentUser } = this.props;

  // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   if (userAuth) {

  //     const userRef = await createUserProfileDocument(userAuth);
  //     userRef.onSnapshot(snapShot => {
  //       setCurrentUser({
  //         id: snapShot.id, ...snapShot.data()
  //       })
  //     })
  //   } else {
  //     setCurrentUser(userAuth)
  //   }
  // })
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyleContainer />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/orders' component={OrderPage} />
        <Route exact path='/checkout' component={CheckoutContainer} />
        <Route exact path='/signin'
          // component={SignInAndSignUpPage} 
          render={() =>
            // this.props.currentUser
            currentUser
              ? (<Redirect to='/' />)
              : (<SignInAndSignUpPage />)
          }
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
});

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: user =>
//     dispatch(setCurrentUser(user))
// })

export default connect(mapStateToProps, mapDispatchToProps)(App);
