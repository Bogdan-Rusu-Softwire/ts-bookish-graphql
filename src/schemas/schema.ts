import { buildSchema } from 'graphql';

// TODO: implement functionality
const schema = buildSchema(`
    type Book {
        isbn: String!
        author: String
        title: String
        number_copies: Int
    }

    type Query {
        status: Int
        getBooks: [Book!]!
    }
`);

export default schema;
