import { sequelizeInstance } from '../config_server/serverConfig';
import { Book, User, Loan } from '../config_server/serverConfig';
import { DbBook } from '../models/DbBook';

export const chooseSQLCommand = async () => {
    // getLoanedBooksUserDB('darian');
};

export const getAllBooksDB = async (): Promise<(typeof Book)[]> => {
    // TODO: implement functionality
    return (
        await sequelizeInstance.models.Book.findAll({
            order: [['title', 'ASC']],
        })
    ).map((item): DbBook => {
        return {
            id: item.dataValues.id,
            title: item.dataValues.title,
            author: item.dataValues.author,
            number_copies: item.dataValues.number_copies,
        };
    });
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
        const userLoans = (
            await Book.findAll({
                include: [
                    {
                        model: Loan,
                        where: {
                            user_id: username,
                        },
                    },
                ],
            })
        ).map((item): DbBook => {
            return {
                id: item.id,
                title: item.title,
                author: item.author,
                number_copies: item.number_copies,
            };
        });
        console.log(userLoans);
        return userLoans;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getBookByTitle = async (
    title: string,
): Promise<(typeof Book)[]> => {
    try {
        const book = (
            await Book.findAll({
                where: {
                    title: title,
                },
            })
        ).map((item): DbBook => {
            return {
                id: item.dataValues.id,
                title: item.dataValues.title,
                author: item.dataValues.author,
                number_copies: item.dataValues.number_copies,
            };
        });
        console.log(book);
        return book;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getBookByAuthor = async (
    author: string,
): Promise<(typeof Book)[]> => {
    try {
        const book = (
            await Book.findAll({
                where: {
                    author: author,
                },
            })
        ).map((item): DbBook => {
            return {
                id: item.dataValues.id,
                title: item.dataValues.title,
                author: item.dataValues.author,
                number_copies: item.dataValues.number_copies,
            };
        });
        console.log(book);
        return book;
    } catch (err) {
        console.log(err);
        return [];
    }
};
