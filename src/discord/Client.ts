import Discord from "discord.js"
import MessageHandler from "../modules/MessageHandler"
import Pervert from "../modules/Pervert"

const Client = new Discord.Client()

// Handlers
Client.on("message", message=>MessageHandler(message))
Client.on("voiceStateUpdate", (oldState, newState)=>Pervert(oldState, newState))

export default Client