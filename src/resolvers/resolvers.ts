import { getAllBooks, addBookToDB } from '../services/bookService';
import { DbBook } from '../models/DbBook';

// TODO: implement functionality
const resolvers = {
    status: () => 200,
    getBooks: async () => {
        try {
            const res = await getAllBooks();
            return res;
        } catch (error) {
            throw new Error(`Failed to fetch books: ${error.message}`);
        }
    },
    addBook: async (book: DbBook) => {
        try {
            const res = await addBookToDB(book);
            return res;
        } catch (error) {
            throw new Error(`Failed to add book: ${error.message}`);
        }
    },
};

export default resolvers;
