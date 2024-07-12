import { getAllBooks } from '../services/bookService';

// TODO: implement functionality
const resolvers = {
    status: () => 200,
    getBooks: async () => {
        try {
            return await getAllBooks();
        } catch (error) {
            throw new Error(`Failed to fetch books: ${error.message}`);
        }
    },
};

export default resolvers;
