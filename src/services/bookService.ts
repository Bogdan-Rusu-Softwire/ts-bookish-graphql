import { sequelizeInstance } from '../config_server/serverConfig';
import { Book } from '../config_server/serverConfig';
import { DbBook } from '../models/DbBook';

export const chooseSQLCommand = async () => {
    // getLoanedBooksUserDB('darian');
};

export const getAllBooksDB = async (): Promise<(typeof Book)[]> => {
    // TODO: implement functionality
    return (await sequelizeInstance.models.Book.findAll()).map(
        (item): DbBook => {
            return {
                id: item.dataValues.id,
                title: item.dataValues.title,
                author: item.dataValues.author,
                number_copies: item.dataValues.number_copies,
            };
        },
    );
};

export const addBookToDB = async (book: DbBook): Promise<string> => {
    try {
        await Book.create({
            id: book.id,
            title: book.title,
            author: book.author,
            number_copies: book.number_copies,
        });
        return 'Successfully added book';
    } catch (err) {
        console.log(err);
        return 'Error in adding book';
    }
};

export const getLoanedBooksUserDB = async (
    username: string,
): Promise<(typeof Book)[]> => {
    try {
        const [results, metadata] = await sequelizeInstance.query(
            `Select Books.*  From Books, Loans, Users WHERE Books.id = Loans.book_id AND Users.id = Loans.[user_id] AND Users.[name] = '${username}'`,
        );
        return results.map((item): DbBook => {
            return {
                id: item.id,
                title: item.title,
                author: item.author,
                number_copies: item.number_copies,
            };
        });
    } catch (err) {
        console.log(err);
        return [];
    }
};
