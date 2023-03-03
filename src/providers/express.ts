import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { i18n } from 'i18next';
import {
    ExceptionHandler,
    NotFoundHandler,
} from '../app/middleware/ExceptionHandler';
import env from '../env';

const Express = () => {
    const app: Application = express();

    const initializeApp = () => {
        app.use(
            cors({
                origin: env.cors.urls,
                methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
            })
        );
        app.use(express.json());
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        app.use(express.static(env.app.root_dir + '/public'));
        app.use(
            env.api.user_uploaded_content_path,
            express.static(env.app.root_dir + '/storage/uploads/')
        );
        app.use(helmet());
        app.use(compression());
        app.disable('x-powered-by');

        const port = env.app.port;
        app.set('port', port);
    };

    const configureViews = () => {
        app.set('view engine', 'hbs');
        app.set('views', env.app.root_dir + '/views/');
    };

    const configureLocale = (middleware: any, i18next: i18n) => {
        app.use(middleware.handle(i18next));
    };

    const configureRateLimiter = () => {
        if (env.api.api_rate_limit > 0) {
            app.use(
                rateLimit({
                    // Rate limiter configuration
                    windowMs: 15 * 60 * 1000, // 15 minutes
                    max: env.api.api_rate_limit, // Limit each IP to 100 requests per 'window' (here, per 15 minutes)
                    standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
                    legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
                })
            );
        }
    };

    const configureExceptionHandler = () => {
        app.use(NotFoundHandler);
        app.use(ExceptionHandler);
    };

    return {
        app,
        initializeApp,
        configureViews,
        configureLocale,
        configureRateLimiter,
        configureExceptionHandler,
    };
};

export default Express;
