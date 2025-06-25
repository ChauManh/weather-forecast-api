import app from './app.config';
import cloudinary from './cloudinary.config';
import database from './database.config';
import openweather from './openweather.config';

export default [app, database, cloudinary, openweather]; // để load trong ConfigModule
