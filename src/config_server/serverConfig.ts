import { PORT, server } from '../app';
import { chooseSQLCommand } from '../services/bookService';
import { Sequelize, DataTypes } from 'sequelize';

export let sequelizeInstance;
export let Book;
export let User;
export let Loan;

export const runServerConfiguration = async () => {
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
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
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
        token_exp_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });

    Loan = sequelizeInstance.define('Loan', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: 'Books',
            referencesKey: 'id',
        },
        user_id: {
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
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });

    Book.hasMany(sequelizeInstance.models.Loan, {
        foreignKey: 'book_id',
    });

    Loan.belongsTo(sequelizeInstance.models.Book, {
        foreignKey: 'book_id',
    });

    User.hasMany(sequelizeInstance.models.Loan, {
        foreignKey: 'user_id',
    });

    Loan.belongsTo(sequelizeInstance.models.User, {
        foreignKey: 'user_id',
    });

    server.listen(PORT, () => {
        console.log(`Server is running on localhost:${PORT}`);
    });
};
