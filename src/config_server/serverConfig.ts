import tedious, { ConnectionConfiguration, Connection } from 'tedious';
import { PORT, server } from '../app';

export let connection: Connection;

export const runServerConfiguration = () => {
    const config: ConnectionConfiguration = {
        server: 'localhost', // or "localhost"
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

    connection = new Connection(config);

    connection.on('connect', function (err) {
        if (err) {
            console.log('Error: ', err);
        } else {
            // If no error, then good to go...
            server.listen(PORT, () => {
                console.log(`Server is running on localhost:${PORT}`);
            });
        }
    });
    // Initialize the connection.
    connection.connect();
};
