import { UserActionTypes } from "./user.types";

export const setCurrentUser = user => ({
    type: UserActionTypes.SetCurrentUser,
    payload: user
});

export const removeCurrentUser = () => ({
    type: UserActionTypes.RemoveCurrentUser,
    payload: null
});