// npm init
// npm install --save firebase

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import dispatch from 'redux'
// import { addItem } from '../redux/cart/cart.actions';
// import { store } from '../redux/store';

const config = {
    apiKey: "AIzaSyA6WIngM7nuOJed1sdpypvmNJw3TRMTkEg",
    authDomain: "apparel-shops.firebaseapp.com",
    databaseURL: "https://apparel-shops.firebaseio.com",
    projectId: "apparel-shops",
    storageBucket: "apparel-shops.appspot.com",
    messagingSenderId: "682852590849",
    appId: "1:682852590849:web:f15f5f5bb38735aea96700",
    measurementId: "G-YPG4B57THX"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    //DOCUMENT
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    //COLLECTION REFERENCE AND SNAPSHOT
    // const UserRefCollection = firestore.collection('users');
    // const snapShotCollection = await UserRefCollection.get();
    // console.log({ collection: snapShotCollection.docs.map(doc => doc.data()) });

    // console.log("SnapShot from firebase utils to check if user already available", snapShot);

    if (!snapShot.exists) {

        const { displayName, email } = userAuth;
        // console.log("Testing to await    Print UserAuth", userAuth);

        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            console.log("User Creation Success - Testing")
        } catch (error) {
            console.error('Error Creating User', error.message)
        }
    } else {
        // console.log("User Already Avaialable - Testing")
    }
    return userRef;
    // console.log(firestore.doc('users/128fdashadu'));
}

//TO SET IF THE DOC_REF IS TO BE THE TITLE - PASS VALUE
//AND TO BE ANY RANDOM - NO ARGS SHOULD BE PASSED collectionref.doc();

// const newDocRef = collectionRef.doc(obj.title);
// console.log(newDocRef.path,newDocRef.id);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log("HEY THIS IS COLLECTION REF TO INSERT DATA INTO DB", collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })
    return await batch.commit();
};

export const convertCollectionSnapshotToMaplimited = (snapshot) => {
    const transformedCollection = snapshot.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            id: doc.id,
            title,
            routeName: encodeURI(title.toLowawaiterCase()),
            items
        }
    })
    // console.log(transformedCollection)

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

export const convertCollectionSnapshotToMap = (snapShot) => {
    const transformedCollection = snapShot.docs.map(doc => {
        const { title, routeName, items } = doc.data();
        return {
            id: doc.id,
            title,
            routeName: encodeURI(routeName.toLowerCase()),
            items
        }
    })
    // console.log(transformedCollection)

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

// PROMISE BASED USER AUTH FETCH
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

//FIRESTORE HISTORY UPDATE ON PAYMENT SUCCESS
export const cartHistoryUpdateDocument = async (userAuth, cartItem, additionalData) => {
    if (!userAuth) return;

    const { data } = additionalData;
    // const { date } = headers;

    const UserHistoryCollectionRef = firestore.collection(`users/${userAuth.uid}/UserHistory`);
    const UserHistoryinfoDocRef = UserHistoryCollectionRef.doc();

    const snapShot = await UserHistoryinfoDocRef.get();
    if (!snapShot.exists) {
        const paymentDate = new Date();
        try {
            await UserHistoryinfoDocRef.set({
                paymentDate,
            })
            console.log("History Updation Success")
        } catch (error) {
            console.error('Error Creating History', error.message)
        }
    }

    const batch = firestore.batch();

    // FIRESTORE CART ITEM HISTORY UPDATE
    const cartItemRef = UserHistoryinfoDocRef.collection("CartItem");
    cartItem.forEach(obj => {
        const { name } = obj;
        const newCartDocRef = cartItemRef.doc(name);
        batch.set(newCartDocRef, obj);
    });

    // FIRESTORE PAYMENT HISTORY UPDATE
    const historyItemRef = UserHistoryinfoDocRef.collection("Payment-details");
    const { success } = data;
    const newSuccesArray = []
    newSuccesArray.push(success);

    newSuccesArray.forEach(obj => {
        const { id, amount, ...otherdata } = obj;
        // console.log(typeof amount, amount)
        const amountFinal = amount / 100;
        const newPaymentDocRef = historyItemRef.doc(id);
        batch.set(newPaymentDocRef, { amountFinal, ...otherdata })
    })

    return await batch.commit();
}

//FIRESTORE CART ITEM UPDATION - ADD OR REMOVE
export const cartItemUpdateDocument = async (userAuth, cartItem) => {
    if (!userAuth) return;
    const collectionRef = firestore.collection(`users/${userAuth.uid}/cart`);

    // collectionRef.onSnapshot(function (snapShot) {
    //     console.log(snapShot);
    //     snapShot.docChanges().forEach((change) => {
    //         let vari = change.doc.data();

    //         const modifyArray = [];
    //         modifyArray.push(vari);
    //         console.log(modifyArray);
    //         store.dispatch(addItem(modifyArray))
    //     });
    // });

    const batch = firestore.batch();
    cartItem.forEach(obj => {
        const { name } = obj;
        const newDocRef = collectionRef.doc(name);
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

//FIRESTORE CART ITEM DELETION - DELETE SPECIFIC CART ITEM
export const cartItemDeleteDocument = async (userAuth, itemToRemove) => {
    if (!userAuth) return;
    const collectionRef = firestore.collection(`users/${userAuth.uid}/cart`);

    const batch = firestore.batch();
    const newDocRef = collectionRef.doc(itemToRemove);

    batch.delete(newDocRef);
    return await batch.commit();
}

//FIRESTORE CART DELETION - DELETE ENTIRE CART
export const cartClearDocument = async (userAuth) => {
    if (!userAuth) return;
    const collectionRef = firestore.collection(`users/${userAuth.uid}/cart`);
    collectionRef
        .get()
        .then(cartItem => {
            cartItem.forEach(cartCollection => {
                cartCollection.ref.delete();
            })
        })
}

//FIRESTORE CART CONCAT STATE AND USER CART
export const cartConcatWithFirebase = (userAuth, reducerCartState, firebaseCartState) => {
    if (!userAuth) return;
    // console.log(cartState);
    // console.log(remoteCartState);

    const newObj = reducerCartState.map(reducerCart => {
        const existingCartItem = firebaseCartState.find(
            firebaseCart => reducerCart.id === firebaseCart.id
        );
        if (existingCartItem)
            return ({ ...reducerCart, quantity: reducerCart.quantity + existingCartItem.quantity });
        else
            return ({ ...reducerCart });
    });
    cartItemUpdateDocument(userAuth, newObj);
}

export const getCartState = (userAuth) => {
    const collectionRef = firestore.collection(`users/${userAuth.uid}/cart`);

    collectionRef.onSnapshot(function (snapShot) {
        console.log(snapShot);
        snapShot.docChanges().forEach((change) => {
            let newObj = change.doc.data();

            const modifyArray = [];
            modifyArray.push(newObj);
            console.log(modifyArray);
            return modifyArray;
        });
    });
}
// FIRESTORE GET ORDER DETAILS
export const getUserHistory = (UHCollectionSnapShot) => {

    if (!UHCollectionSnapShot.empty) {
        const paymentHistory = UHCollectionSnapShot.docs.map((doc) => {
            const paymentDate = new Date((doc.data().paymentDate.seconds) * 1000)
            return {
                id: doc.id,
                date: paymentDate
            }
        })
        return paymentHistory;
    } else {
        console.log("No User History data found")
    }
}

//Firebase Auth
export const auth = firebase.auth();

//Firebase Firestore
export const firestore = firebase.firestore();

//For Creating Pop-Up login in Signin Page
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;