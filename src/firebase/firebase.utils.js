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
        console.log("Testing to Print UserAuth", userAuth);

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
        console.log("User Already Avaialable - Testing")
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

export const convertCollectionSnapshotToMap = (snapshot) => {
    const transformedCollection = snapshot.docs.map(doc => {
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

//Firebase Auth
export const auth = firebase.auth();

//Firebase Firestore
export const firestore = firebase.firestore();

//For Creating Pop-Up login in Signin Page
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;