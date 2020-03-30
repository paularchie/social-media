import React, { useState } from 'react';
import Form from '../../common/components/Form/Form';
import Card from '../../common/components/Card/Card';
import { FormControlPropsArray } from '../../common/components/Form/models/Form.model';
import { FormControlTypes } from '../../common/components/Form/enums/FormControlTypes.enum';
import { required } from '../../common/components/Form/util/validators';
import Icon, { IconTypes } from '../../common/components/Icon/Icon';
import Footer from '../../common/components/Footer/Footer';
import './Signin.scss';
import useUserApi from '../../common/hooks/UserApi.hook';
import { setCurrentUser } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { FormErrorTypes } from '../../common/components/Form/enums/FormErrorTypes.enum';

const Signin = (): JSX.Element => {

    const [formErrors, setFormErrors] = useState(null);
    const dispatch = useDispatch();
    const userApi = useUserApi();


    const handleSubmit = async (formData/*: FormData*/) => {
        event.preventDefault();
        try {
            const user = await userApi.login(formData);
            user
                ? dispatch(setCurrentUser(user))
                : setCredentialErrors();
        } catch (error) {
            console.log(error);
        }
    }

    const setCredentialErrors = (): void => {
        const errors = {
            email: { [FormErrorTypes.Default]: true },
            password: { [FormErrorTypes.IncorrectCredentials]: true }
        };
        setFormErrors(errors);
    }

    function handleInputChange() {
        // clear errors
        const errors = {
            email: { [FormErrorTypes.Default]: null },
            password: { [FormErrorTypes.IncorrectCredentials]: null }
        };

        setFormErrors(errors);
    }

    const controlProps: FormControlPropsArray = [
        {
            id: 'email-field',
            fieldName: 'email',
            controlType: FormControlTypes.Input,
            labelText: 'Email',
            attributes: {
                type: 'text',
                name: 'email'
            },
            validators: [required],
            changeHandler: handleInputChange,
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
            validators: [required],
            changeHandler: handleInputChange,
        }
    ];

    return (
        <div className="form-container login-form center-content">
            <div className="center-content column">

                <Card className="form-wrapper login-form-wrapper card-2 center-content column">
                    <div className='center-content column'>
                        <div className='icon-wrapper center-content'>
                            <Icon
                                iconType={IconTypes.Lock}
                                className='sign-in-icon'
                            />
                        </div>
                        <h1 className='login-form-heading'>Sign In</h1>
                    </div>

                    <Form
                        controlProps={controlProps}
                        submitHandler={handleSubmit}
                        validationErrors={formErrors}
                    />
                </Card>

                <Footer />
            </div>
        </div>
    )
}

export default Signin;






