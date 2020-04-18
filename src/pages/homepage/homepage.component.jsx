import React from 'react'

// import './homepage.styles.scss' //SCSS STYLES CHANGED TO COMPONENT
import { HomePageContainer } from './homepage.styles';

import Directory from '../../components/directory/directory.component'

const HomePage = () => (
    <HomePageContainer>
        < Directory />
        {/* <Directory history={history} /> 
        Prop Drilling to avoid instead use withRouter - A higher Order Component
        */}
    </HomePageContainer >
);

export default HomePage;