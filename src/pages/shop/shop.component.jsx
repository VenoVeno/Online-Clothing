import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
// import { convertCollectionSnapshotToMaplimited } from '../../firebase/firebase.utils'; limited

import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//Converted Class Component to Functional Component and included Redux
class ShopPage extends React.Component {

    state = {
        loading: true
    };

    unsubscribefromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection("collections").orderBy("title", "asc");

        //Firebase Observable/Observer pattern - Observable styles of Object
        this.unsubscribefromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionSnapshotToMap(snapshot)
            updateCollections(collectionMap);
            this.setState({ loading: false })
        })

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

    componentWillUnmount() {
        this.unsubscribefromSnapshot()
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page" >
                <Route exact path={`${match.path}`}
                    render={(props) =>
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />

                    }
                />
                {/* INSTEAD OF PASSING AS  component={CollectionPage} RENDER USING render() with <withSpinner /> */}
                <Route path={`${match.path}/:collectionId`}
                    render={(props) =>
                        <CollectionPageWithSpinner isLoading={loading} {...props} />
                    }
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionMap) =>
        dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);