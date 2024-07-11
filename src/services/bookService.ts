import { Request } from 'tedious';
import { connection } from '../config_server/serverConfig';
import { DbBook } from '../models/DbBook';

export const executeSQL = async (
    query: string | undefined,
): Promise<DbBook[]> => {
    return new Promise((resolve, reject) => {
        const request: Request = new Request(
            query,
            (error: Error | null, rowCount: number) => {
                if (error) {
                    console.log('error');
                    throw error;
                }
            },
        );

        const bookList: DbBook[] = [];

        request.on('row', (columns) => {
            bookList.push({
                isbn: columns.filter(
                    (cell) => cell.metadata.colName === 'isbn',
                )[0].value,
                author: columns.filter(
                    (cell) => cell.metadata.colName === 'author',
                )[0].value,
                title: columns.filter(
                    (cell) => cell.metadata.colName === 'title',
                )[0].value,
                number_copies: columns.filter(
                    (cell) => cell.metadata.colName === 'number_copies',
                )[0].value,
            });

            // columns.forEach((column) => {
            //     if (column.value === null) {
            //         console.log('NULL');
            //     } else {
            //         console.log(column.value);
            //     }
            // });
        });

        request.on('doneProc', () => {
            resolve(bookList);
            //console.log("ajung iaic");
        });

        connection.execSql(request);
    });
};

export const chooseSQLCommand = () => {
    // console.log("ajung acii");
    // executeSQL('select * from Books').then((bookList) => {
    //     console.log(bookList);
    // });
};

export const getAllBooks = async (): Promise<DbBook[]> => {
    // TODO: implement functionality
    return executeSQL('select * from Books')
        .then((bookList) => bookList)
        .catch((err) => {
            return [];
        });
};
