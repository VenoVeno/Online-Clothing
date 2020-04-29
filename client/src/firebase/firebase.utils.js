// npm init
// npm install --save firebase

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
        // console.log("Testing to Print UserAuth", userAuth);

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
            routeName: encodeURI(title.toLowerCase()),
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

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}
//FIRESTORE CART ITEM UPDATION - ADD OR REMOVE
export const cartItemUpdateDocument = async (userAuth, cartItem) => {
    if (!userAuth) return;
    const collectionRef = firestore.collection(`users/${userAuth.uid}/cart`);

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
export const cartConcatWithFirebase = (userAuth, cartState, remoteCartState) => {
    if (!userAuth) return;
    // console.log(cartState);
    // console.log(remoteCartState);

    const newObj = cartState.map(cartLocal => {
        const existingCartItem = remoteCartState.find(
            remoteCart => remoteCart.id === cartLocal.id
        );
        if (existingCartItem)
            return ({ ...cartLocal, quantity: cartLocal.quantity + existingCartItem.quantity });
        else
            return ({ ...cartLocal });
    });
    cartItemUpdateDocument(userAuth, newObj);
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