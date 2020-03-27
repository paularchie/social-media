import React from 'react';
import Field from '@material-ui/core/TextField';
import './TextField.scss';
import useStyles from '../../../hooks/Styles.hook';


const TextField = (props: any): JSX.Element => {

    const classes = useStyles(props.inputProps);

    return (
        <Field
            error={props.error}
            id={props.id}
            label={props.labelText}
            className="text-field"
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onKeyDown={props.onKeyDown}
            variant={props.variant || "outlined"}
            inputProps={{ className: classes.input }}
            {...props.attributes}
        />
    );
}

export default TextField;

