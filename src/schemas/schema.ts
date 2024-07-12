import { buildSchema } from 'graphql';

// TODO: implement functionality
const schema = buildSchema(`
    type Book {
        id: String!
        author: String
        title: String
        number_copies: Int
    }

    type Query {
        status: Int
        getBooks: [Book!]!
        addBook(title): String
        getUsers: [User!]!
    }
`);

export default schema;
