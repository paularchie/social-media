import React from 'react';
import { FormErrorTypes } from './enums/FormErrorTypes.enum';
import { FormErrors, FormErrorValue } from './models/Form.model';

export type FormFieldErrorMessagesProps = {
    errors: FormErrors
}

const FormFieldErrorMessages = ({ errors }: FormFieldErrorMessagesProps): JSX.Element => {

    const PASSWORD_ERROR_MESSAGES = {
        min: 'The minimum length is 8 characters',
        uppercase: 'At least one upper case character',
        lowercase: 'At least one lower case character',
        digits: 'At least one numeric character',
        'err_user': 'Could not create user',
        spaces: 'Password cannot contain any spaces'
    };

    const errorNameToMessageMapping = {
        [FormErrorTypes.Required]: 'Field is required',
        [FormErrorTypes.Email]: 'Please enter a valid email address',
        // minLength: `Min length is ${errors.minLength}`,
        [FormErrorTypes.UsernameExists]: 'This username is not available',
        [FormErrorTypes.EmailExists]: 'This email address is not available',
        [FormErrorTypes.PasswordSecurity]: PASSWORD_ERROR_MESSAGES,
        [FormErrorTypes.PasswordMatch]: 'Password doesn\'t match',
        [FormErrorTypes.IncorrectCredentials]: 'Incorrect Credentials',
    };

    const hasRequiredError = (errors: FormErrors): boolean => {
        return Object.keys(errors).includes(FormErrorTypes.Required);
    }

    const getErrors = (errorType: FormErrorTypes): JSX.Element | JSX.Element[] => {
        const errorValue: FormErrorValue = errors[errorType];
        if (errorValue instanceof Array) {
            return errorValue.map((errorCode: string): JSX.Element => {
                const errorMessage: string = errorNameToMessageMapping[errorType][errorCode];
                return errorElement(errorCode, errorMessage)
            })
        }

        // if the error type is 'default', no error message will show up
        // only the input field will be marked red
        const errorMessage: string = errorNameToMessageMapping[errorType]
            ? errorNameToMessageMapping[errorType]
            : errorType === FormErrorTypes.Default
                ? null
                : ('unknown error: ' + errorType);

        return errorElement(errorType, errorMessage);
    }

    const errorElement = (key: FormErrorTypes | string, message: string): JSX.Element => {
        return <p key={key}>{message}</p>
    }

    return (
        <>
            {
                hasRequiredError(errors)
                    ? <p>{errorNameToMessageMapping[FormErrorTypes.Required]}</p>
                    : Object.keys(errors).map((errorType: FormErrorTypes) => getErrors(errorType))
            }
        </>
    )
}

export default FormFieldErrorMessages;