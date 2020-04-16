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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
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

firebase.initializeApp(config);

//Firebase Auth
export const auth = firebase.auth();

//Firebase Firestore
export const firestore = firebase.firestore();

//For Creatin Pop-Up login in Signin Page
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;