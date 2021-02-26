import Discord from 'discord.js';
import path from 'path';
import { getVoiceStream } from 'discord-tts';
import { PervertUser } from '../models/PervertUser';
import { Command, Branch, Argument } from './Parser';

const SoundsFolder: string = path.join(__dirname, '..', 'config', 'sounds');

const Haunt = (newState: Discord.VoiceState, user: PervertUser) => {
  newState.channel.join().then((Connection): void => {
    setTimeout(() => {
      if (user.mode === 'obama') {
        const Player = Connection.play(path.join(SoundsFolder, 'obama.mp3'));
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
    ['tts', 'youtube'],
    [
      new Branch([
        new Argument('required', ['tts']),
        new Argument('long', ['Text for tts']),
      ]),
      new Branch([
        new Argument('required', ['youtube']),
        new Argument('required', ['$youtubelink']),
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
