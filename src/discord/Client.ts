import Discord from "discord.js"
import MessageHandler from "../modules/MessageHandler"

const Client = new Discord.Client()

// Handlers
Client.on("message", message=>MessageHandler(message))

export default Client