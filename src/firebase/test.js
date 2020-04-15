import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('yG5qE2hV7AzBTrZztMP9').collection('cart-item').doc('ItSnfDNKvBziUUs0iTZY');
firestore.doc('/users/yG5qE2hV7AzBTrZztMP9/cart-item/ItSnfDNKvBziUUs0iTZY');
firestore.collection('/users/yG5qE2hV7AzBTrZztMP9/cart-item');
