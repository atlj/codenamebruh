import Discord from 'discord.js';
import MessageHandler from '../modules/MessageHandler.js';
import {Users} from '../modules/Pervert.js';
import fs from 'fs';

const Client = new Discord.Client();

//Events
Client.on('message', (message) => MessageHandler(message));
Client.on(
  'voiceStateUpdate',
  (oldState, newState) => {
    //if (oldState.id in Users) {
    console.log(newState);
    if (oldState.channel !== newState.channel) {
      newState.channel.join().then((connection) => {
        //connection.play('../../config/pervert/default.mp3');
      });
    }
  },
  //}
);
export default Client;
