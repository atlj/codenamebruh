import Discord from 'discord.js';
import ytdl from 'ytdl-core';
import { getVoiceStream } from 'discord-tts';
import { PervertUser } from '../models/PervertUser';
import { Command, Branch, Argument } from './Parser';

const Haunt = (newState: Discord.VoiceState, user: PervertUser) => {
  newState.channel.join().then((Connection): void => {
    setTimeout(() => {
      if (user.mode === 'yt') {
        const stream = ytdl(user.data, { quality: 'highestaudio' });
        let Player: Discord.StreamDispatcher;
        console.log(user);

        if (user.duration !== '') {
          const durationArray = user.duration.split('-');
          const startSecond = Number.parseFloat(durationArray[0]);
          const endSecond = Number.parseFloat(durationArray[1]);

          Player = Connection.play(stream, { seek: startSecond });
          Player.once('start', () => {
            setTimeout(() => {
              Player.end();
            }, (endSecond - startSecond) * 1000);
          });
        } else {
          Player = Connection.play(stream);
        }
        Player.once('finish', () => {
          Connection.disconnect();
        });
      } else if (user.mode === 'tts') {
        const Player = Connection.play(getVoiceStream(user.data, 'tr-TR'));
        Player.once('finish', () => {
          Connection.disconnect();
        });
      }
    }, 2000);
  });
};

export default (
  oldState: Discord.VoiceState,
  newState: Discord.VoiceState,
): void => {
  PervertUser.getUser(oldState.id).then((user): void => {
    if (user !== false) {
      if (oldState.channel !== newState.channel && newState.channel !== null) {
        Haunt(newState, user[0]);
      }
    }
  });
};

const addbranchArgs = [
  new Argument('required', ['add']),
  new Argument('required', ['$userid']),
  new Argument(
    'required branch',
    ['tts', 'yt'],
    [
      new Branch([
        new Argument('required', ['tts']),
        new Argument('long', ['Text for tts']),
      ]),
      new Branch([
        new Argument('required', ['yt']),
        new Argument('required', ['$youtubelink']),
        new Argument('optional', ['$margin']),
      ]),
    ],
  ),
];
const listbranchArgs = [new Argument('required', ['list'])];
const removebranchArgs = [
  new Argument('required', ['remove']),
  new Argument('required', ['$userid']),
];

const pervertArgs: Argument[] = [
  new Argument('required', ['pervert']),
  new Argument(
    'required branch',
    ['add', 'list', 'remove'],
    [
      new Branch(addbranchArgs),
      new Branch(listbranchArgs),
      new Branch(removebranchArgs),
    ],
  ),
];

const pervertCommand = new Command(pervertArgs);

export { pervertCommand };
