import { PORT, server } from '../app';
import { chooseSQLCommand } from '../services/bookService';
import { Sequelize, DataTypes } from 'sequelize';

export let sequelizeInstance;
export let Book;
export let User;
export let Loan;

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

    User = sequelizeInstance.define('User', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token_expiration_date: {
            type: DataTypes.DATE,
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

    Loan = sequelizeInstance.define('Loan', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        idBook: {
            type: DataTypes.STRING,
            allowNull: false,
            references: 'Books',
            referencesKey: 'id',
        },
        idUser: {
            type: DataTypes.STRING,
            allowNull: false,
            references: 'Users',
            referencesKey: 'id',
        },
        due: {
            type: DataTypes.DATE,
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
