import { sequelizeInstance } from '../config_server/serverConfig';
import { Book } from '../config_server/serverConfig';
import { DbBook } from '../models/DbBook';

export const chooseSQLCommand = async () => {
    console.log(await getAllBooks());
};

export const getAllBooks = async (): Promise<(typeof Book)[]> => {
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
