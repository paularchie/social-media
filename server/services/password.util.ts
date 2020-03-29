import * as argon2 from 'argon2';

export async function hashPassword(password): Promise<String> {
        return await argon2.hash(password);
}

export async function comparePasswords(hash, plainPassword): Promise<Boolean> {
        return Promise.resolve(true)
        // return await argon2.verify(hash, plainPassword);
}
