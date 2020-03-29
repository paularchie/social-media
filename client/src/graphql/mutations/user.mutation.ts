
export const createUserMutation = `
    mutation($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) { 
        createUser (
            firstName: $firstName, 
            lastName: $lastName, 
            username: $username,
            email: $email,
            password: $password 
        ) { 
           id
        } 
    }
`

export default {
    createUserMutation
};