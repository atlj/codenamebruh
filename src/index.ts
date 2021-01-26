//Entry point

//dotenv config
import "./bootstrap";

import app from './app';
app(process.env.TOKEN);
