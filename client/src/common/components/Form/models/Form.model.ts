import { FormControlTypes } from "../enums/FormControlTypes.enum";

export type ValidatorFn = (value: string) => any;
export type AsyncValidatorFn = (value: string) => Promise<any>;


export type FormControlPropsArray = Array<FormControlProps | FormControlProps[]>;

export type FormControlProps = {
    id: string,
    fieldName: string,
    controlType: FormControlTypes,
    labelText: string;
    changeHandler?: (any) => any,
    validators?: ValidatorFn[],
    asyncValidators?: AsyncValidatorFn[],
    attributes?: {}
    value?: string,
    flex?:number
};

export type ValidationErrors = { [key: string]: any }

export type FormProps = {
    controlProps: FormControlPropsArray,
    submitHandler: (/*formData: FormData*/ any) => void,
    formChangeHandler?: (formData: FormData) => void,
    validationErrors?: ValidationErrors
};

export type FormData = {
    [key: string]: {
        value: string,
        touched: boolean,
        errors: { [key: string]: {} | null }
    };
}