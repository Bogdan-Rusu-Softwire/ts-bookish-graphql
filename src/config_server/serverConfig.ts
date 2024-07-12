import { PORT, server } from '../app';
import { chooseSQLCommand } from '../services/bookService';
import { Sequelize, DataTypes } from 'sequelize';

export let sequelizeInstance;
export let Book;

export const runServerConfiguration = () => {
    sequelizeInstance = new Sequelize(
        'bookish',
        'Bogdan',
        'darianbeastmode123@',
        {
            dialect: 'mssql',
            host: 'localhost',
            port: 1433,
        },
    );

    Book = sequelizeInstance.define('Book', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number_copies: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    server.listen(PORT, () => {
        console.log(`Server is running on localhost:${PORT}`);
    });
};
