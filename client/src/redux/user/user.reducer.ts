import { UserActionTypes } from "./user.types";
import { UserState } from "../store";

const InitialState: UserState = {
    currentUser: null
};

const userReducer = (state = InitialState, action) => {

    const { type, payload } = action;

    const actionHandlers = {
        [UserActionTypes.SetCurrentUser]: setUser
    };

    const handler = actionHandlers[type];

    return handler ? handler() : state;


    function setUser() {
        return {
            ...state,
            currentUser: payload
        }
    }
}

export default userReducer;