import * as express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { prisma } from './prisma/prisma-client';
import datamodelInfo from './prisma/nexus-prisma';
import * as path from 'path';
import { makePrismaSchema } from 'nexus-prisma';
import { Query } from './graphql/queries/user.query';
import { Mutation } from './graphql/mutations/user.mutation';
import { cors } from './middleware/cors.middleware';
import { decodeJwt } from './services/jwt.util';
import { cookieParse } from './services/cookie.util';

const schema = makePrismaSchema({
    types: [Query, Mutation],

    prisma: {
        datamodelInfo,
        client: prisma,
    },

    outputs: {
        schema: path.join(__dirname, './prisma/schema.graphql'),
        typegen: path.join(__dirname, './prisma/nexus.ts'),
    },
})

const app = express();
// app.use(cors)
// routes(app, prisma);

const corsOptions = {
    origin: `*`,
    credentials: false
}

const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
        let authToken = null;
        let currentUser = null;
        try {
            authToken = cookieParse(req, 'SESSION');
            if (authToken) {
                currentUser = await decodeJwt(authToken);
            }
        } catch (error) {
            throw new AuthenticationError('Authentication error');
        }
        return { prisma, authToken, currentUser, res };
    },
    formatError: error => {
        console.warn('GraphQL Error:', error.message);
        return error;
    },
    playground: {
        settings: {
            'request.credentials': 'include',
        }
    },

})

server.applyMiddleware({ app, cors: corsOptions, path: '/graphql' });

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen({ port: PORT }, () => {
    console.log(`Server is listening at port ${PORT}`);
});
