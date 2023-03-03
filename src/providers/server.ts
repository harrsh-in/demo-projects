import { Application } from 'express';
import http from 'http';
import env from '../env';
import logger from './logger';

const Server = (app: Application) => {
    const server = http.createServer(app);

    /**
     *  Runs the HTTP server
     */
    const start = async () => {
        server.listen(env.app.port);
        logger.info(`Server listening on port: ${env.app.port}...`);
        server.on('error', onError);
    };

    /**
     * Event listener for HTTP server "error" event.
     */
    const onError = async (error: any) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind =
            typeof env.app.port === 'string'
                ? 'Pipe ' + env.app.port
                : 'Port ' + env.app.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.fatal(bind + ' requires elevated privileges');
                process.exit(1);

            case 'EADDRINUSE':
                logger.fatal(bind + ' is already in use');
                process.exit(1);

            default:
                throw error;
        }
    };

    return {
        start,
    };
};

export default Server;
