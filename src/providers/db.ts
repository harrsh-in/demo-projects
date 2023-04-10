import mongoose from 'mongoose';
import env from '../env';
import logger from './logger';

const connectDB = async () => {
    logger.info('Connecting to MongoDB...');
    await mongoose.connect(env.db.url);
    logger.info('Connected to MongoDB...');
};

export default connectDB;
