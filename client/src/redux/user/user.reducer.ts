import { UserActionTypes } from "./user.types";
import { UserState } from "../store";

const InitialState: UserState = {
    currentUser: null
};

const userReducer = (state = InitialState, action) => {

    const { type, payload } = action;

    const actionHandlers = {
        [UserActionTypes.SetCurrentUser]: setUser,
        [UserActionTypes.RemoveCurrentUser]: removeUser
    };

    const handler = actionHandlers[type];

    return handler ? handler() : state;


    function setUser() {
        return {
            ...state,
            currentUser: payload
        }
    }

    function removeUser() {
        return {
            ...state,
            currentUser: null
        }
    }
}

export default userReducer;