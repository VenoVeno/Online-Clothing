import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

//SIMPLE SHOP COLLECTION SELECTION BEFORE CONVERTING ARRAY INTO OBJECTS
export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
)

//UPDATED COLLECTION SELECTION PREVIEW AFTER CONVERTING ARRAY TO OBJECT-- SHOPDATA.
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    (collections) =>
        (collections
            ? Object.keys(collections).map(key => collections[key])
            : [])
)

//DATA NORMALIZATION TECHNIQUE CONVERTING ID MATCH TO OBJECT MATCH
export const selectCollection = (collectionUrlParam) =>
    createSelector(
        [selectCollections],
        (collections) =>
            (collections
                ? collections[collectionUrlParam]
                : null)
    )

//const COLLECTION_MAP_ID = {hats: 1,sneakers: 2,jackets: 3,womens: 4,mens: 5}
//ID MATCH USING COLLECTION_MAP_ID WITH COLLECTION ID
//      (collections) => collections.find(
//             collection => collection.id === COLLECTION_MAP_ID[collectionUrlParam]
//  )

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    (shop) => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
)