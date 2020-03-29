import { AuthenticationError } from 'apollo-server';

export const authenticated = next => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new AuthenticationError('Unauthenticated');
    }
    return next(root, args, context, info);
}
