import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component'

import './directory.styles.scss'

//Converted Class Component to Functional Component and included Redux
const Directory = ({ sections }) => (
    <div className="directory-menu">
        {
            //  imageUrl, id, size, linkUrl instead of this ...{anyName}
            sections.map(({ id, ...otherSectionProps }) => (
                <MenuItem key={id} {...otherSectionProps} />

                //history={this.props.history} Prop Drilling to pass the props to children..
                //It does the only Job of pushing the value to children...
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);