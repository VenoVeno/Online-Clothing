import { takeLatest, call, put } from 'redux-saga/effects';
import { ShopActionTypes } from './shop.types';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection("collections").orderBy("title", "asc");
        const snapshot = yield collectionRef.get(); //Similar To Async Await
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot); //Saga func Call
        yield put(fetchCollectionsSuccess(collectionsMap)); //Saga action call instead of normal dispatch
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)

    // while(true){ //Internally TakeEvery Works like this - Non-Blocking
    //     yield take(ShopActionTypes.FETCH_COLLECTIONS_START);
    //     yield console.log("Am Called Here!")
    //     delay(5000);
    // } //Blocks the execution for next 5000 sec then logs the log..If delay is not included logs for each start
}