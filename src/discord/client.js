import Discord from 'discord.js';
import MessageHandler from '../modules/MessageHandler.js';
import {Users} from '../modules/Pervert.js';

const Client = new Discord.Client();

//Events
Client.on('message', (message) => MessageHandler(message));
Client.on(
  'voiceStateUpdate',
  (oldState, newState) => {
    //if (oldState.id in Users) {
    console.log(newState);
    if (oldState.channel !== newState.channel) {
      if (newState.channel === null) {
        //TODO: disconnect
      } else {
        newState.channel.join().then((connection) => {
          const player = connection.play('../../config/pervert/default.mp3');
          // player.once('finish', () => {
          //   connection.disconnect();
          // });
        });
      }
    }
  },
  //}
);
export default Client;
