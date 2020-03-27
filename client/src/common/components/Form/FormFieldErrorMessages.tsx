import React from 'react';
import { FormErrorTypes } from './enums/FormErrorTypes.enum';

const FormFieldErrorMessages = ({ errors }): JSX.Element => {

    const PASSWORD_ERROR_MESSAGES = {
        min: 'The minimum length is 8 characters',
        uppercase: 'At least one upper case character',
        lowercase: 'At least one lower case character',
        digits: 'At least one numeric character',
        'err_user': 'Could not create user',
        spaces: 'Password cannot contain any spaces'
    };

    const errorNameToMessageMap = {
        [FormErrorTypes.required]: 'Field is required',
        [FormErrorTypes.email]: 'Please enter a valid email address',
        // minLength: `Min length is ${errors.minLength}`,
        [FormErrorTypes.usernameExists]: 'This username is not available',
        [FormErrorTypes.emailExists]: 'This email address is not available',
        [FormErrorTypes.passwordSecurity]: PASSWORD_ERROR_MESSAGES,
        [FormErrorTypes.passwordMatch]: 'Password doesn\'t match',
        [FormErrorTypes.incorrectCredentials]: 'Incorrect Credentials',
    };


    const hasRequiredError = (errors) => {
        return Object.keys(errors).includes('required');
    }

    const getErrors = (errorType): JSX.Element | JSX.Element[] => {
        const errorValue = errors[errorType];
        if (errorValue instanceof Array) {
            return errorValue.map(errorCode => {
                const errorMessage = errorNameToMessageMap[errorType][errorCode];
                return errorElement(errorCode, errorMessage)
            })

        }

        const errorMessage = errorNameToMessageMap[errorType] ? errorNameToMessageMap[errorType] :
            errorType === 'default' ? null : ('unknown error: ' + errorType);
        return errorElement(errorType, errorMessage);
    }

    const errorElement = (key, message): JSX.Element => {
        return <p key={key}>{message}</p>
    }

    return (
        <>
            {
                hasRequiredError(errors)
                    ? <p>{errorNameToMessageMap['required']}</p>
                    : Object.keys(errors).map(errorType => getErrors(errorType))
            }
        </>
    )
}

export default FormFieldErrorMessages;