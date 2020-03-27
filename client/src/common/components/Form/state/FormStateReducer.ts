import { FormActionTypes } from "../enums/FormActionTypes.enum";
import { produce } from 'immer';
import { isEmptyObject } from "../util/isEmptyObject.util";

const FormStateReducer = (state, action) => {

    const actionHandlers = {
        [FormActionTypes.InitialiseState]: setInitialFormState,
        [FormActionTypes.HandleOnBlur]: updateFieldTouchedState,
        [FormActionTypes.UpdateFieldValue]: updateFieldValue,
        [FormActionTypes.UpdateFieldErrors]: updateFieldErrors
    }

    return actionHandlers[action.type] ? actionHandlers[action.type]() : state;


    function setInitialFormState() {
        return { ...action.payload };
    }

    function updateFieldTouchedState() {
        const fieldName = action.payload;
        return produce(state, draftState => {
            draftState[fieldName].touched = true;
        });
    }

    function updateFieldValue() {
        const { fieldValue, fieldName, returnValueOnly } = action.payload;
        return produce(state, draftState => {
            returnValueOnly ?
                draftState[fieldName] = fieldValue :
                draftState[fieldName].value = fieldValue;
        });
    }

    function updateFieldErrors() {
        return produce(state, draftState => {
            Object.keys(action.payload).forEach(fieldName => {
                const fieldNewState = draftState[fieldName];
                // if the errors value for a given field is null, reset the errors state
                // otherwise merge the errors into the existing errors state 
                const fieldErrors = action.payload[fieldName];
                if (!fieldErrors) {
                    fieldNewState.errors = null;
                }

                fieldErrors && Object.keys(fieldErrors).forEach(err => {
                    // if a give error is set to null, remove the error from the state
                    // otherwise add it to the state
                    if (fieldErrors[err] === null) {
                        if (fieldNewState.errors && fieldNewState.errors[err]) {
                            delete fieldNewState.errors[err];
                        }
                    } else {
                        fieldNewState.errors = {
                            ...fieldNewState.errors,
                            ...{ [err]: fieldErrors[err] }
                        };
                    }
                })

                if (isEmptyObject(fieldNewState.errors)) {
                    fieldNewState.errors = null;
                }
            });
        });
    }
};

export default FormStateReducer;