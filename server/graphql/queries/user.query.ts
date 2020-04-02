import { stringArg } from 'nexus'
import { prismaObjectType, } from 'nexus-prisma'
import { comparePasswords } from '../../services/password.util';
import { createSessionToken } from '../../services/jwt.util';
import { authenticated } from '../../services/authenticated.guard';



export const Query = prismaObjectType({
    name: 'Query',
    definition(t) {
        t.prismaFields(['*'])
        t.field('login', {
            type: 'User',
            args: {
                email: stringArg(),
                password: stringArg(),
            },
            nullable: true,
            resolve: async (_, { email, password }, ctx) => {
                const user = await ctx.prisma.user({ email });
                if (user) {
                    if (await comparePasswords(user.password, password)) {
                        const token = await createSessionToken(user);
                        ctx.res.cookie('SESSION', token, {
                            httpOnly: true,
                            maxAge: 1000 * 60 * 60 * 24 * 365 // counted in miliseconds, set to one year
                        });
                        return user;
                    }
                    return null;
                }
                return null
            }
        })
        t.field('getUser', {
            type: 'User',
            nullable: true,
            resolve: (_, args, ctx) => {
                if (ctx.currentUser) {
                    return ctx.prisma.user({ id: ctx.currentUser.id })
                }
                return null;
            }
        })
        t.field('checkIfValueExists', {
            type: 'Boolean',
            args: {
                field: stringArg(),
                value: stringArg()
            },
            nullable: true,
            resolve: async (_, { field, value }, ctx) =>
                !!(await ctx.prisma.user({ [field]: value }))

        })
        t.field('logout', {
            type: 'Boolean',
            nullable: true,
            resolve: authenticated((_, args, ctx) => {
                ctx.res.clearCookie('SESSION');
                return true;
            })
        })
    },
})