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


{ STYLED_COMPONENTS }
// npm install styled-components

EXAMPLE
import styled from 'styled-components';

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