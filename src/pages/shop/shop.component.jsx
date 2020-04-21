import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

// import { createStructuredSelector } from 'reselect';
// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';
// import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../collection/collection.container';

// import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
// import { convertCollectionSnapshotToMaplimited } from '../../firebase/firebase.utils'; limited

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//Converted Class Component to Functional Component and included Redux
class ShopPage extends React.Component {

    Unsafe
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();

        //const { updateCollections } = this.props;

        //const collectionRef = firestore.collection("collections").orderBy("title", "asc");
        //Firebase Observable/Observer pattern - Observable styles of Object
        // this.unsubscribefromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionMap = convertCollectionSnapshotToMap(snapshot)
        //     updateCollections(collectionMap);
        //     this.setState({ loading: false })
        // })

        //Using .get Makes a API Call and .then Return Promise - API Call
        // this.unsubscribefromSnapshot = collectionRef.get().then(
        //     snapshot => {
        //         const collectionMap = convertCollectionSnapshotToMap(snapshot)
        //         updateCollections(collectionMap);
        //         this.setState({ loading: false })
        //     }
        // )

        //Using Native Fetch - API - DB:Firebase - API - A large depth to get Value from firebase
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db/databases/(default)/documents/collections')
        //     .then(response => response.json())
        //     .then(collections => console.log(collections))
    }

    render() {
        const { match } = this.props;
        // const { isCollectionsFetching, isCollectionsLoaded } = this.props;
        // const { loading } = this.state;
        return (
            <div className="shop-page" >
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                {/* INSTEAD OF PASSING AS  component={CollectionPage} RENDER USING render() with <withSpinner /> */}
                <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
                {/* render={(props) =>
                    <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
                } */}
            </div>
        )
    }
}

// const mapStateToProps = createStructuredSelector({
//     isCollectionsFetching: selectIsCollectionFetching,
//     isCollectionsLoaded: selectIsCollectionsLoaded
// });

const mapDispatchToProps = (dispatch) => ({
    // updateCollections: (collectionMap) =>
    //     dispatch(updateCollections(collectionMap))
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);