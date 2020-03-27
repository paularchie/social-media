import React, { useEffect } from 'react';
import { FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import Icon from '../../Icon/Icon';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { TypeaheadInputProps } from './TypeaheadInputProps';

const TypeaheadInput = (props: TypeaheadInputProps): JSX.Element => {

    const { id, label, style, keyUpHandler, iconType, typeaheadDelay } = props;

    useEffect(() => {
        const input = document.getElementById(props.id);
        const keyup$ = fromEvent(input, 'keyup');
        const subscription = keyup$
            .pipe(
                map((event: any) => event.target.value),
                debounceTime(typeaheadDelay || 500),
                distinctUntilChanged()
            )
            .subscribe(value => keyUpHandler(value));
        return () => subscription.unsubscribe();
    }, [])

    const endAdornment = iconType ?
        <InputAdornment position="end">
            {/* <Icon>{iconType}</Icon> */}
        </InputAdornment> : null;

    return (
        <FormControl style={style}>
            <InputLabel htmlFor={id}>
                {label}
            </InputLabel>
            <Input
                id={id}
                endAdornment={endAdornment}
            />
        </FormControl>
    )
}

export default TypeaheadInput;