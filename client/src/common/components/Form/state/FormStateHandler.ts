import React, { useReducer, useState, useEffect } from 'react';
import { FormActionTypes } from '../enums/FormActionTypes.enum';
import FormStateReducer from './FormStateReducer';
import { FormControlProps } from '../models/Form.model';
import { convertArrayToObject } from '../util/convertArrayToObject';

const useFormStateHandler = (returnValueOnly) => {

    const [formState, dispatch] = useReducer(FormStateReducer, {});
    const [isValid, setIsValid] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(false);
    const [controlProps, setControlProps] = useState(null);

    useEffect(() => {
        controlProps && initialiseState();
    }, [controlProps]);

    useEffect(() => {
        setIsValid(isFormValid());
    }, [formState]);

    // set initial form state
    const initialiseState = (): void => {
        const initialState = {};
        Object.keys(controlProps).map(fieldName => {
            const value = returnValueOnly ? '' : {
                value: '',
                touched: false,
                errors: controlProps[fieldName].validators ? getValidationErrors('', fieldName) : null
            }
            initialState[fieldName] = value;
        });
        dispatch({ type: FormActionTypes.InitialiseState, payload: initialState })
    }

    // this is triggered when errors are passed through input
    const updateErrors = (errors): void => {
        // console.log('errors', errors)
        errors && dispatch({ type: FormActionTypes.UpdateFieldErrors, payload: errors });
    }

    const updateFieldValueAndValidationState = async (fieldValue, fieldName) => {
        // // update field value
        dispatch({ type: FormActionTypes.UpdateFieldValue, payload: { fieldValue, fieldName, returnValueOnly } });
        // update errors if there are any

        if (controlProps[fieldName].validators) {
            const validationErrors = getValidationErrors(fieldValue, fieldName);
            dispatch({ type: FormActionTypes.UpdateFieldErrors, payload: { [fieldName]: validationErrors } });
        }

        if (controlProps[fieldName].asyncValidators) {
            setPending(true);
            const asyncValidationErrors = await getAsyncValidationErrors(fieldValue, fieldName);
            dispatch({ type: FormActionTypes.UpdateFieldErrors, payload: { [fieldName]: asyncValidationErrors } });
            setPending(false);
        }
    }

    const updateFieldTouchedState = (fieldName: string): void => {
        dispatch({ type: FormActionTypes.HandleOnBlur, payload: fieldName })
    }

    const isFormValid = (): boolean => {
        return !Object.keys(formState).find(fieldName => {
            return formState[fieldName].errors;
        });
    }

    const handleOnChange = (value, name): void => {
        updateFieldValueAndValidationState(value, name);
    }

    const handleOnBlur = (fieldName): void => {
        updateFieldTouchedState(fieldName)
    }

    const getValidationErrors = (fieldValue: string, fieldName: string) => {
        const singleFieldProps: FormControlProps = controlProps[fieldName];
        const validators = singleFieldProps.validators;
        const errors = validators.map(validator => validator(fieldValue));;

        return convertArrayToObject(errors);
    }

    const getAsyncValidationErrors = (fieldValue: string, fieldName: string) => {
        return new Promise(async (resolve) => {
            // get validators from props if supplied
            const singleFieldProps: FormControlProps = controlProps[fieldName];
            const validators = singleFieldProps.asyncValidators;
            let errorsPromiseArray = [];
            if (validators && validators.length) {
                errorsPromiseArray = validators.map(validator => validator(fieldValue));
            }
            const errors = (await Promise.all(errorsPromiseArray));
            return resolve(errors.length ? convertArrayToObject(errors) : null);
        });
    }

    return {
        formState,
        isValid,
        pending,
        handleOnChange,
        handleOnBlur,
        updateErrors,
        setControlProps
    }
}

export default useFormStateHandler;