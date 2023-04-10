import connectDB from './providers/db';
import Express from './providers/express';
import initializeLocales from './providers/locale';
import logger from './providers/logger';
import Server from './providers/server';

const express = Express();
const { middleware, i18next } = initializeLocales();

Promise.all([
    express.initializeApp(),
    express.configureViews(),
    express.configureLocale(middleware, i18next),
    express.configureRateLimiter(),
    express.configureExceptionHandler(),
]).then(async () => {
    const app = express.app;

    const httpServer = Server(app);
    await httpServer.start();
    await connectDB();
});

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});

process.on('SIGTERM', async () => {
    logger.debug('SIGTERM signal received: closing HTTP server');
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit(1);
});
