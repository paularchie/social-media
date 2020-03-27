// import React from 'react';
// import { useGlobalContext, useAuthContext } from '../state/GlobalContext';

// const useRBAC = () => {

//     const { currentUser } = useAuthContext();

//     const hasUserRoles = (roles: string[]): boolean => {
//         return !!currentUser && !!currentUser.roles.find(
//             role => roles.indexOf(role) > -1
//         );
//     }

//     return {
//         hasUserRoles
//     }
// }

// export default useRBAC;