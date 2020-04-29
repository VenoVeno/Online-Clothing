import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectCartItems, selectCartTotal, selectIsCartFetching } from '../../redux/cart/cart.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CheckoutPage from './checkout.component';

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    isLoading: selectIsCartFetching
});

const CheckoutContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CheckoutPage);

export default CheckoutContainer;