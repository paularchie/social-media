import React from 'react';
import { FormControlTypes } from './enums/FormControlTypes.enum';
import TextField from './TextField/TextField';

const FormField = ({ controlProps, blurHandler, changeHandler, error, inputProps }: any): JSX.Element => {

    const props = {
        onChange: (event) => {
            changeHandler && changeHandler(controlProps, {
                value: event.currentTarget.value,
                name: event.currentTarget.name
            })
        },
        onBlur: (event) => {
            blurHandler && blurHandler(event.currentTarget.name)
        },
        onKeyDown: (event) => {
            // prevent submit on enter press
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        },
        error,
        inputProps,
        ...controlProps
    }

    const controls = {
        [FormControlTypes.Input]: <TextField {...props} />,
        [FormControlTypes.TextArea]: <textarea {...props} />
    }

    return controls[controlProps.controlType];
}

export default FormField;