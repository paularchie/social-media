import React, { useEffect, useState } from 'react';
import './Form.scss';
import { FormControlProps, FormProps } from './models/Form.model';
import FormFieldErrorMessages from './FormFieldErrorMessages';
import FormField from './FormField';
import useFormStateHandler from './state/FormStateHandler';
import { convertArrayToMap } from '../../util/convertArrayToMap.util';
import Button from '../Button/Button';


const Form = ({ controlProps, submitHandler, formChangeHandler, validationErrors, template, templateCurrentChangeProps, showButton = true, returnValueOnly }: any/*: FormProps*/): JSX.Element => {

    const {
        formState,
        isValid,
        pending,
        handleOnChange,
        handleOnBlur,
        updateErrors,
        setControlProps
    } = useFormStateHandler(returnValueOnly);

    const [currentFieldChangeCallback, setCurrentFieldChangeCallback] = useState(null);


    useEffect(() => {
        if (templateCurrentChangeProps) {
            const { props, event } = templateCurrentChangeProps;
            handleChange(props, event);
        }
    }, [templateCurrentChangeProps])

    useEffect(() => {
        setControlProps(convertArrayToMap(controlProps, 'fieldName'));
    }, [])

    useEffect(() => {
        formChangeHandler && formChangeHandler(formState)
        currentFieldChangeCallback && currentFieldChangeCallback(formState)
        setCurrentFieldChangeCallback(null);
    }, [formState]);

    useEffect(() => {
        // this is triggered when the errors are passed through props
        updateErrors(validationErrors)
    }, [validationErrors]);


    const getFormValue = () => {
        let formValue = {};
        for (let [fieldName, fieldState] of Object.entries(formState) as any) {
            formValue = {
                ...formValue,
                ...{ [fieldName]: fieldState.value }
            }
        }
        return formValue;
    }

    const getErrors = (controlName: string) => {
        const control = formState[controlName];
        const errors = control && control.errors;
        const isTouched = control && control.touched;

        return errors && isTouched
            ? <FormFieldErrorMessages errors={errors} />
            : null
    }

    const setIsTouched = (controlName: string) => {
        return () => {
            handleOnBlur(controlName);
        };
    }

    const hasError = (controlName: string) => {
        const control = formState[controlName];
        const isTouched = control && control.touched;
        return control && control.errors && isTouched;
    }

    const handleChange = (props: FormControlProps, event) => {
        // state handler will update the state
        handleOnChange(event.value, event.name);
        // the callback is set so that it can be triggered with the new version of the 
        // state, once it gets updated
        if (props.changeHandler) {
            setCurrentFieldChangeCallback(() => (formState) => {
                props.changeHandler({
                    value: event.value,
                    formState,
                    setIsTouched: setIsTouched(event.name)
                })
            });
        }
    }


    const getItems = (cntrolProps) => {
        return (
            <>
                {!template && cntrolProps.map((props, index) => (
                    <React.Fragment key={index}>
                        {props instanceof Array ?
                            <div className="inline-field-wrapper" >
                                {getItems(props)}
                            </div>
                            :
                            <div
                                className='field-wrapper'
                                style={{ flex: props.flex }}
                            >
                                <FormField
                                    controlProps={props}
                                    changeHandler={handleChange}
                                    blurHandler={handleOnBlur}
                                    error={hasError(props.fieldName)}
                                />
                                {getErrors(props.fieldName)}
                            </div>
                        }
                    </React.Fragment>
                )
                )}

                {template && template}
            </>
        )
    }


    return (
        <form onSubmit={() => submitHandler(getFormValue())}>
            {getItems(controlProps)}
            {showButton && <Button
                type="submit"
                color="primary"
                disabled={!(isValid && !pending)}
            >
                Submit
                </Button>}
        </form>
    )
}


export default Form;
