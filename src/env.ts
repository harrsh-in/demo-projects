import dotenv from 'dotenv';
import { getOsEnv, getOsEnvOptional, toNumber } from './libs/env';

dotenv.config();

/**
 * Environment variables
 */
const env = {
    node: getOsEnvOptional('APP_ENV') || 'local',

    app: {
        name: getOsEnv('APP_NAME'),
        host: getOsEnvOptional('APP_URL') || 'http://localhost:8000',
        port: getOsEnv('APP_PORT'),
        root_dir: getOsEnv('APP_ENV') !== 'local' ? 'dist' : 'src',
    },

    api: {
        api_prefix: getOsEnv('API_PREFIX'),
        api_rate_limit: toNumber(getOsEnv('API_RATE_LIMIT')),
        pagination_limit: toNumber(getOsEnv('PAGINATION_LIMIT')),
        user_uploaded_content_path: getOsEnv('USER_UPLOADED_CONTENT_PATH'),
    },

    cors: {
        urls: getOsEnv('CORS_AVAILABLE_LINKS').split(','),
    },
};

export default env;
