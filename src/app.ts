import express from 'express';
import schema from './schemas/schema';
import resolvers from './resolvers/resolvers';
import { graphqlHTTP } from 'express-graphql';
import { runServerConfiguration } from './config_server/serverConfig';

export const server = express();

export const PORT = 3000;

server.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    }),
);

runServerConfiguration();
