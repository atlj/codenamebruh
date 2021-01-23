import Discord from 'discord.js';
import MessageHandler from '../modules/MessageHandler.js';
import {Users} from '../modules/Pervert.js';
import tts from 'discord-tts';

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
          setTimeout(() => {
            const player = connection.play(
              tts.getVoiceStream(
                'adım ömer ve ağzımdan dick eksik olmaz.',
                'tr-TR',
              ),
            );
            // const player = connection.play(
            //   'https://atlj.github.io/filehost/obama.mp3',
            // );
            player.once(
              'finish',
              () => {
                connection.disconnect();
              },
              2,
            );
          });
        });
      }
    }
  },
  //}
);
export default Client;
