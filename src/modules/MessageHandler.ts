import Discord from "discord.js"

import Replier from "./Replier"

export default (message:Discord.Message):void=>{
    const Reply:string|boolean = Replier(message.content)
    if(Reply !== false){
        message.reply(Reply)
    }
}