import React from 'react';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

//Converted Class Component to Functional Component and included Redux
const ShopPage = ({ collections }) => (
    <div className="shop-page">
        <CollectionsOverview />
    </div>
)


export default ShopPage;