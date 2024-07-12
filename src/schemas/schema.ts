import { buildSchema } from 'graphql';

// TODO: implement functionality
const schema = buildSchema(`
    type Book {
        id: String!
        author: String
        title: String
        number_copies: Int
    }
    
    type User {
        id: String!
        name: String!
        password_hash: String!
        token: String!
        token_exp_date: String!
    }

    type Query {
        status: Int
        getBooks: [Book!]!
        getLoanedBooksUser(username: String!): [Book]
    }
    
    type Mutation {
        addBook(id: String!, title: String!, author: String!, number_copies: Int!): String
    }
`);

export default schema;
