import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('yG5qE2hV7AzBTrZztMP9').collection('cart-item').doc('ItSnfDNKvBziUUs0iTZY');
firestore.doc('/users/yG5qE2hV7AzBTrZztMP9/cart-item/ItSnfDNKvBziUUs0iTZY');
firestore.collection('/users/yG5qE2hV7AzBTrZztMP9/cart-item');

{ Redux_Installation }
//npm install redux redux-logger react-redux
{ or }
// npm install --save react-redux
// npm install --save redux
// npm i --save redux-logger

{ Redux_Persist }
// npm install redux-persist

{ Redux_thunk }
// npm install redux-thunk

{ STYLED_COMPONENTS }
// npm install styled-components

EXAMPLE
import styled from 'styled-components';
import { useEffect } from 'react';

// CSS_IN_JS--USING CSS INSIDE JS
const Text = styled.div`
    color:red;
    font-size: 20px;
    border: ${ ({ isActive })} => 
        isActive ? '1px solid black' : '3px dotted red'
`;

<Text isActive={true} >I am a Component</Text>

CAN_ALSO_IMPORT_THIS_COMPONENT_IN_ANOTHER_COMPONENT;
AND_USE_IN_ANOTHER_COMPONENT_WITH_PASSING_PROPS_TO_THE_COMPONENT;


ADD_THIS_TO_FORM_INPUT_STYLES_JSX_IF_TO_CHANGE_LABEL_TRANSITION;
// &:focus ~ label {
//     ${shrinkLabelStyles}
// }}

//REACT HOOKS - useState and useEffect
// import {useState} from 'react';
// To use State inside functional component where to switch to Class instead states can be used.
// In case if we don't need any life-cycle methods and only need state - UseState can be used 
const [name, setName] = useState('Veno');
<button onClick={() => setName('Indhu')}> Change Name </ button>

// import {useEffect} from 'react;

// To fire this whenever a component changes at any place - like for each change in a functional component
// Fires whenever render gets called
useEffect(() => {
    console.log("hi");
})

//To fire for particular Input or something - In here whenever Name Changes it logs hi.
useEffect(() => {
    console.log("hi");
}, [name])

//To fire like componentDidMount one time - Pass empty Array
useEffect(() => {
    console.log("hi");
}, [])

//To fetch From Some JSON using useEffect()
useEffect(() => {
    const fetchFunc = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${searchQuery}`);
        const responseJSON = await response.json();
        setUser(responseJSON[0])
    };
    fetchFunc();
},[searchQuery]);
//This fetch from the API when-ever the search query Changes.

//Only Call Hooks at the Top Level -more on Hook rules @ https://reactjs.org/docs/hooks-rules.html
