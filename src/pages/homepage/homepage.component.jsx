import React from 'react'
import './homepage.styles.scss'

import Directory from '../../components/directory/directory.component'

const HomePage = () => (
    <div className="homepage">
        <Directory />
        {/* <Directory history={history} /> 
        Prop Drilling to avoid instead use withRouter - A higher Order Component
        */}
    </div>
);

export default HomePage;