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
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;