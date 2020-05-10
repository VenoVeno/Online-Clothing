import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import OrderOverviewContainer from '../../components/order-overview/order-overview.container';

import { fetchOrder } from '../../redux/order/order.actions';

import './orderpage.styles.scss';

const OrderPage = ({ fetchOrder }) => {

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return (
        <div className="order-page-container">
            <h1> Your Orders will show up Here!</h1>
            <OrderOverviewContainer />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchOrder: () => dispatch(fetchOrder())
});

export default connect(null, mapDispatchToProps)(OrderPage);