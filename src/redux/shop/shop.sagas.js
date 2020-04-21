import { takeEvery, call, put } from 'redux-saga/effects';
import { ShopActionTypes } from './shop.types';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection("collections").orderBy("title", "asc");
        const snapshot = yield collectionRef.get(); //Similar To Async Await
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot); //Saga Call
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}