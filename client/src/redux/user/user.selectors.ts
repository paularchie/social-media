import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { AppState, UserState } from '../store';

const selectUserState = (state: AppState): UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUserState,
    (userState: UserState) => userState.currentUser
);

export const selectAuthenticationState = createSelector(
    selectUserState,
    (userState: UserState) => {
        return !!userState.currentUser
    }
);

export type UseUserSelectors = {
    currentUser: UserState
    isLoggedIn: boolean
}

const useUserSelectors = (): UseUserSelectors => {
    return {
        currentUser: useSelector(selectCurrentUser),
        isLoggedIn: useSelector(selectAuthenticationState)
    }
}

export default useUserSelectors;