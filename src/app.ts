import express from 'express';
import schema from './schemas/schema';
import resolvers from './resolvers/resolvers';
import { graphqlHTTP } from 'express-graphql';
import { runSQLServerConfiguration } from './config_server/serverConfig';
import { Connection } from 'tedious';

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

export const connection: Connection = runSQLServerConfiguration();
