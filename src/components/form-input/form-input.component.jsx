import React from 'react';

// import './form-input.styles.scss'; //SCSS STYLES CHANGED TO COMPONENT
// import { } from './form-input.styles';
import { GroupContainer, FormInputContainer, FormInputLabel } from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherInputProps }) => (
    <GroupContainer>
        <FormInputContainer onChange={handleChange} {...otherInputProps} />
        {
            label
                ? (<FormInputLabel {...otherInputProps}>{label}</FormInputLabel>)
                : (null)
        }
    </GroupContainer>
)

export default FormInput;