import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg'

// import './header.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles'

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { connect } from 'react-redux';

//IMPORTED IN HEADER STYLES JSX
//import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/" >
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/checkout">
                <strike>CONTACT</strike>   CHECKOUT
            </OptionLink>
            {
                currentUser ?
                    //TO PASS IN COMPONENT WE CAN GIVE as={COMPONENT NAME}
                    (<OptionLink as='div'
                        onClick={() => {
                            auth.signOut()
                        }}
                    >SIGN OUT</OptionLink>)
                    :
                    (<OptionLink to="/signin">SIGN IN</OptionLink>)
                //{`SIGN OUT ${currentUser.displayName.split(' ')[0].toUpperCase()}`} </div>)

            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden
                ?
                null
                :
                <CartDropdown />
        }
    </HeaderContainer>
)
// const mapStateToProps = (state) => ({
//     currentUser: state.user.currentUser
// })

// const mapStateToProps = (state) => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// })

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);