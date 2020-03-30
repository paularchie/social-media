import { EMAIL_REGEX } from "../constants";
import { FormErrorTypes } from "../enums/FormErrorTypes.enum";
import { validatePassword } from "./validatePassword";

export const required = (value: string): { [key: string]: boolean } => {
    return value && value.trim() ? { [FormErrorTypes.Required]: null } : { [FormErrorTypes.Required]: true };
}

export const email = (value: string): { [key: string]: boolean } | null => {
    return !(new RegExp(EMAIL_REGEX).test(value)) ? { [FormErrorTypes.Email]: true } : { [FormErrorTypes.Email]: null }
};

export const passwordSecurity = (value: string): { [key: string]: string[] } | null => {
    const errors: any = value && value.trim ? validatePassword(value) : [];
    return errors.length ? { [FormErrorTypes.PasswordSecurity]: errors } : { [FormErrorTypes.PasswordSecurity]: null };
}

const comparePasswordsAndGetError = () => {
    let passwordFieldValue, confirmPasswordFieldValue;
    return (confirmPasswordField: boolean, value: string) => {

        if (confirmPasswordField) {
            confirmPasswordFieldValue = value;
        } else {
            passwordFieldValue = value;
        }

        return confirmPasswordField && passwordFieldValue !== confirmPasswordFieldValue ?
            { passwordMatch: true } : { passwordMatch: null }
    }
}

const getPasswordMatchErrors = comparePasswordsAndGetError();

export const passwordMatch = (confirmPasswordField?: boolean) => {
    return (value: string) => {
        return getPasswordMatchErrors(confirmPasswordField, value);
    }
}


