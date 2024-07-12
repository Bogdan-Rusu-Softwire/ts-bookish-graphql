import {
    addBookToDB,
    getAllBooksDB,
    getBookByTitle,
    getLoanedBooksUserDB,
    getBookByAuthor
} from '../services/bookService';
import { DbBook } from '../models/DbBook';

// TODO: implement functionality
const resolvers = {
    status: () => 200,
    getBooks: async () => {
        try {
            return await getAllBooksDB();
        } catch (error) {
            throw new Error(`Failed to fetch books: ${error.message}`);
        }
    },
    addBook: async (book: DbBook) => {
        try {
            return await addBookToDB(book);
        } catch (error) {
            throw new Error(`Failed to add book: ${error.message}`);
        }
    },
    getLoanedBooksUser: async (wrapper: { username: string }) => {
        try {
            return await getLoanedBooksUserDB(wrapper.username);
        } catch (error) {
            throw new Error(
                `Failed to get loaned books from this user: ${error.message}`,
            );
        }
    },
    getBookByTitle: async (wrapper: { title: string }) => {
        try {
            return await getBookByTitle(wrapper.title);
        } catch (err) {
            throw new Error(
                `Failed to get the book with this title: ${err.message}`,
            );
        }
    },
    getBookByAuthor: async (wrapper: { author: string }) => {
        try {
            return await getBookByAuthor(wrapper.author);
        } catch (err) {
            throw new Error(
                `Failed to get the book with this title: ${err.message}`,
            );
        }
    },
};

export default resolvers;
