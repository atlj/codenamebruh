//Entrypoint

//dotenv config
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

app(process.env.TOKEN);
