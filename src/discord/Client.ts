import Discord from 'discord.js';
import MessageHandler from '../modules/MessageHandler';
import Pervert from '../modules/Pervert';

const Client = new Discord.Client();

//Deprecated for now, use mentioning instead

const findUserID = (username: string): string | false => {

  console.log(Client.users);

  const user: Discord.User | undefined = Client.users.cache.find(
    (user) => user.username === username,
  );

  if (user) {
    return user.id;
  } else {
    return false;
  }
};

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

export { findUserID };
export default Client;
