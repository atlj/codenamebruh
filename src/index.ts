//Entry point

//dotenv config
import dotenv from "dotenv"
dotenv.config()

import app from "./app"
app(process.env.TOKEN)
