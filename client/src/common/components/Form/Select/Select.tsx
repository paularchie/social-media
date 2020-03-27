import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MUISelect from '@material-ui/core/Select';
import MenuItem from '../../MenuItem/MenuItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: '100%',
        }
    })
);

const Select = ({ value, items, inputLabel, name, id, required, changeHandler }): JSX.Element => {

    const classes = useStyles({});
    const inputLabelRef = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    useEffect(() => {
        setLabelWidth(inputLabelRef.current!.offsetWidth);
    }, []);

    return (
        <FormControl variant="outlined" className={classes.formControl}>

            <InputLabel ref={inputLabelRef} htmlFor={id}>
                {inputLabel}
            </InputLabel>

            <MUISelect
                value={value}
                onChange={({target}) => changeHandler(target.value) }
                labelWidth={labelWidth}
                inputProps={{ name, id, }}
            >
                {!required && <MenuItem value="">
                    <em>None</em>
                </MenuItem>}

                {items && items.map(item => (
                    <MenuItem
                        key={item.value}
                        value={item.value}
                    >{item.displayText}</MenuItem>
                ))}
            </MUISelect>

        </FormControl>
    )
}

export default Select;