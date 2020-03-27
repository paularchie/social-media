import React from 'react';
import { ButtonProps } from './ButtonProps.type';
import MaterialButton from '@material-ui/core/Button';
import './Button.scss';
import clsx from 'clsx';
import useStyles from '../../hooks/Styles.hook';

const Button = (props: ButtonProps): JSX.Element => {

    const classes = useStyles(props.style);

    return (
        <MaterialButton
            variant={props.variant || "contained"}
            color={props.color}
            type={props.type}
            disabled={props.disabled}
            onClick={props.clickHandler}
            className={clsx("button", classes && classes.root)}
            {...props.attributes}
        >
            {props.children}
        </MaterialButton>
    )
}

export default Button;

