import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectOrderItems, selectIsOrderFetching } from '../../redux/order/order.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';
import OrderPage from './order-overview.component';

const mapStateToProps = createStructuredSelector({
    orders: selectOrderItems,
    isLoading: selectIsOrderFetching
});

const OrderOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(OrderPage);

export default OrderOverviewContainer;