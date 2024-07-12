import tedious, { ConnectionConfiguration, Connection } from 'tedious';
import { PORT, server } from '../app';

export const runSQLServerConfiguration = (): Connection => {
    const config: ConnectionConfiguration = {
        server: 'localhost',
        authentication: {
            type: 'default',
            options: {
                domain: 'ntlm',
                userName: 'Bogdan',
                password: 'darianbeastmode123@',
            },
        },
        options: {
            port: 1433,
            database: 'bookish',
            trustServerCertificate: true,
        },
    };

    const connection = new Connection(config);

    connection.on('connect', function (err) {
        if (err) {
            console.log('Error: ', err);
        } else {
            server.listen(PORT, () => {
                console.log(`Server is running on localhost:${PORT}`);
            });
        }
    });

    connection.connect();
    return connection;
};
