import Discord from 'discord.js';
import MessageHandler from '../modules/MessageHandler.js';

const Client = new Discord.Client();

Client.on('message', (message) => MessageHandler(message));

export default Client;
