import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

// import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
// import { convertCollectionSnapshotToMaplimited } from '../../firebase/firebase.utils'; limited

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//Converted Class Component to Functional Component and included Redux
class ShopPage extends React.Component {

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
        const { match, isCollectionFetching } = this.props;
        // const { loading } = this.state;
        return (
            <div className="shop-page" >
                <Route exact path={`${match.path}`}
                    render={(props) =>
                        <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} />
                    }
                />
                {/* INSTEAD OF PASSING AS  component={CollectionPage} RENDER USING render() with <withSpinner /> */}
                <Route path={`${match.path}/:collectionId`}
                    render={(props) =>
                        <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
});

const mapDispatchToProps = (dispatch) => ({
    // updateCollections: (collectionMap) =>
    //     dispatch(updateCollections(collectionMap))
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);