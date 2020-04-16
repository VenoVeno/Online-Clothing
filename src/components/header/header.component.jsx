import React from 'react';
import './header.styles.scss';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';


const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link className="logo-container" to="/" >
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/signin">
                CONTACT
            </Link>
            {
                currentUser ?
                    (<div
                        className="option"
                        onClick={() => {
                            auth.signOut()
                        }}
                    >SIGN OUT</div>)
                    :
                    (<Link className="option" to="/signin">SIGN IN</Link>)
                //{`SIGN OUT ${currentUser.displayName.split(' ')[0].toUpperCase()}`} </div>)

            }
            <CartIcon />
        </div>
        {
            hidden
                ?
                null
                :
                <CartDropdown />
        }
    </div>
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