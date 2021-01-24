import Discord from 'discord.js';
import MessageHandler from '../modules/MessageHandler';
import Pervert from '../modules/Pervert';

const Client = new Discord.Client();

const FindUserID = (Username: string): string => {
  //TODO: make this function fail-safe
  return Client.users.cache.find((user) => user.username === Username).id;
};

// Handlers
Client.on('message', (message) => MessageHandler(message));
Client.on('voiceStateUpdate', (oldState, newState) =>
  Pervert(oldState, newState),
);

export {FindUserID};
export default Client;
