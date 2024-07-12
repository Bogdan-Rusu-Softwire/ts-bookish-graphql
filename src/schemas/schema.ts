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
    
    type Loan {
        id: String!
        user_id: String!
        book_id: String!
        due: String!
    }

    type Query {
        status: Int
        getBooks: [Book!]!
        getLoanedBooksUser(username: String!): [Book]
        getBookByTitle(title: String!): [Book]
        getBookByAuthor(author: String!): [Book]
    }
    
    type Mutation {
        addBook(id: String!, title: String!, author: String!, number_copies: Int!): String
    }
`);

export default schema;
