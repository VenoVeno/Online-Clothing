import { createSelector } from 'reselect';

const selectOrder = (state) => state.order;

export const selectOrderItems = createSelector(
    [selectOrder],
    (order) => order.orderItems
);

export const selectIsOrderFetching = createSelector(
    [selectOrder],
    (order) => order.isOrderFetching
)