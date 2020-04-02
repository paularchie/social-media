import React, { useEffect, useState } from 'react';
import useUserApi from '../../common/hooks/UserApi.hook';
import { FormErrorTypes } from '../../common/components/Form/enums/FormErrorTypes.enum';
import { FormControlPropsArray } from '../../common/components/Form/models/Form.model';
import { FormControlTypes } from '../../common/components/Form/enums/FormControlTypes.enum';
import { required, email, passwordSecurity } from '../../common/components/Form/util/validators';
import Form from '../../common/components/Form/Form';
import TitleBar from '../../common/components/TitleBar/TitleBar';



const Signup = (): JSX.Element => {

    const [formErrors, setFormErrors] = useState(null);
    const userApi = useUserApi();

    useEffect(() => {
        updateConfirmPasswordErrors({ value: '', formState: null, required });
    }, [])

    const handleSubmit = async (formData: FormData) => {
        event.preventDefault();
        const success = await userApi.createAccount(formData);
        if (success) {
            alert('user has been created')
        }
    }

    const handlePasswordChange = ({ formState }) => {
        updateConfirmPasswordErrors({ formState })
    }

    const handleConfirmPasswordChange = ({ value, formState }) => {
        updateConfirmPasswordErrors({ value, formState, required })
    }

    const updateConfirmPasswordErrors = ({ value, formState, required }: any) => {
        const passwordValue = formState ? formState['password'].value : '';
        const confirmPasswordValue = formState ? formState['confirmPassword'].value : '';
        const errors = passwordValue !== confirmPasswordValue ?
            {
                confirmPassword: {
                    [FormErrorTypes.PasswordMatch]: true,
                    ...(required ? required(value) : null)
                }
            }
            : {
                confirmPassword: {
                    [FormErrorTypes.PasswordMatch]: null,
                    ...(required ? required(value) : null)
                }

            }

        setFormErrors(errors);
    }

    const checkIfValueExists = (field: string) => {
        return async (value: string): Promise<any> => {
            return new Promise(async resolve => {
                const userExists = await userApi.checkIfValueExists(field.trim(), value.trim());
                resolve({ [`${field}Exists`]: userExists ? true : null });
            });
        }
    }

    const controlProps: FormControlPropsArray = [
        {
            id: 'first-name-field',
            fieldName: 'firstName',
            controlType: FormControlTypes.Input,
            labelText: 'First Name',
            attributes: {
                type: 'text',
                name: 'firstName'
            },
            validators: [required]
        },
        {
            id: 'last-name-field',
            fieldName: 'lastName',
            controlType: FormControlTypes.Input,
            labelText: 'Last Name',
            attributes: {
                type: 'text',
                name: 'lastName'
            },
            validators: [required]
        },
        {
            id: 'username-field',
            fieldName: 'username',
            controlType: FormControlTypes.Input,
            labelText: 'Username',
            attributes: {
                type: 'text',
                name: 'username'
            },
            validators: [required],
            asyncValidators: [checkIfValueExists('username')]
        },
        {
            id: 'email-field',
            fieldName: 'email',
            controlType: FormControlTypes.Input,
            labelText: 'Email',
            attributes: {
                type: 'text',
                name: 'email'
            },
            validators: [required, email],
            asyncValidators: [checkIfValueExists('email')]

        },
        {
            id: 'password-field',
            fieldName: 'password',
            controlType: FormControlTypes.Input,
            labelText: 'Password',
            attributes: {
                type: 'password',
                name: 'password'
            },
            validators: [
                required,
                passwordSecurity
            ],
            changeHandler: handlePasswordChange
        },
        {
            id: 'confirm-password-field',
            fieldName: 'confirmPassword',
            controlType: FormControlTypes.Input,
            labelText: 'Confirm Password',
            attributes: {
                type: 'password',
                name: 'confirmPassword'
            },
            changeHandler: handleConfirmPasswordChange
        }
    ];




    return (
        <>
            <TitleBar title="Create Account"/>
            <div className="form-container center-content">
                <div className="form-wrapper">
                    <Form
                        controlProps={controlProps}
                        submitHandler={handleSubmit}
                        validationErrors={formErrors}
                    />
                </div>
            </div>
        </>
    )
}

export default Signup;







