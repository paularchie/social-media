import React from 'react';
import './Login.scss';
import Form from '../../common/components/Form/Form';
import Card from '../../common/components/Card/Card';
import { FormControlPropsArray } from '../../common/components/Form/models/Form.model';
import { FormControlTypes } from '../../common/components/Form/enums/FormControlTypes.enum';
import { required } from '../../common/components/Form/util/validators';
import Icon, { IconTypes } from '../../common/components/Icon/Icon';
import Footer from '../../common/components/Footer/Footer';

const Login = () => {

    const handleSubmit = async (formData: FormData) => {
        event.preventDefault();
    }

    const handleInputChange = (): void => {
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
        },
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
                    />
                </Card>
                <Footer />
            </div>
        </div>
    )
}

export default Login//withRouter(Login);






