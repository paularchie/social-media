import { stringArg, intArg, arg, idArg } from 'nexus'
import { prismaObjectType, } from 'nexus-prisma'
import { authenticated } from '../../services/authenticated.guard';
import { hashPassword } from '../../services/password.util';
import { UserInputError } from 'apollo-server';
import { NexusArgDef } from 'nexus/dist/core';


export const Mutation = prismaObjectType({
    name: 'Mutation',
    definition(t) {
        t.prismaFields(['*'])
        t.field('createUser', {
            type: 'User',
            args: {
                firstName: stringArg(),
                lastName: stringArg(),
                username: stringArg(),
                email: stringArg(),
                password: stringArg(),
                roles: stringArg({ list: true })
            },
            resolve: authenticated(async (_, args, ctx) => {
                const user = ctx.prisma.createUser({
                    ...args,
                    password: await hashPassword(args.password),
                    roles: { set: args.roles }

                });
                return user;
            })
        });
    }
});


