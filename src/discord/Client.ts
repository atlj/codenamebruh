import Discord from 'discord.js';
import MessageHandler from '../modules/MessageHandler';
import Pervert from '../modules/Pervert';

const Client = new Discord.Client();

// Handlers
Client.on('message', (message): void => {
  if (Client.user.id !== message.member.id) {
    // Bot won't track itself
    MessageHandler(message);
  }
});
Client.on('voiceStateUpdate', (oldState, newState): void => {
  if (Client.user.id !== oldState.id) {
    // Bot won't track itself
    Pervert(oldState, newState);
  }
});

export default Client;
