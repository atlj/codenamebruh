import Discord, { User } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { getVoiceStream } from 'discord-tts';

interface mode {
  mode: string;
  data?: string;
}

interface Users {
  [userid: string]: mode;
}
const UsersFileLocation: string = path.join(
  __dirname,
  '..',
  'config',
  'pervert',
  'target_users.json',
);
const SoundsFolder: string = path.join(__dirname, '..', 'config', 'sounds');

const AddUsertoPervertList = (id: string, mode: mode) => {
  fs.readFile(UsersFileLocation, (err: NodeJS.ErrnoException, data: Buffer) => {
    if (err) throw err;
    let Users: Users = JSON.parse(data.toString());
    Users = { ...Users, [id]: mode };
    fs.writeFile(UsersFileLocation, JSON.stringify(Users), () => {});
  });
};

const RemoveUserfromPervertList = (id: string) => {
  fs.readFile(UsersFileLocation, (err: NodeJS.ErrnoException, data: Buffer) => {
    if (err) throw err;
    let Users: Users = JSON.parse(data.toString());
    delete Users[id];
    fs.writeFile(UsersFileLocation, JSON.stringify(Users), () => {});
  });
};

const ListUsers = (): string => {
  const UsersRaw = fs.readFileSync(UsersFileLocation);
  return UsersRaw.toString();
};

const Haunt = (newState: Discord.VoiceState, mode: mode) => {
  newState.channel.join().then((Connection): void => {
    setTimeout(() => {
      if (mode.mode === 'obama') {
        const Player = Connection.play(path.join(SoundsFolder, 'obama.mp3'));
        Player.once('finish', () => {
          Connection.disconnect();
        });
      } else if (mode.mode === 'tts') {
        const Player = Connection.play(getVoiceStream(mode.data, 'tr-TR'));
        Player.once('finish', () => {
          Connection.disconnect();
        });
      }
    }, 2000);
  });
};

export { AddUsertoPervertList, RemoveUserfromPervertList, ListUsers };

export default (
  oldState: Discord.VoiceState,
  newState: Discord.VoiceState,
): void => {
  fs.readFile(UsersFileLocation, (err: NodeJS.ErrnoException, data: Buffer) => {
    if (err) throw err;
    const Users: object = JSON.parse(data.toString());

    if (oldState.id in Users) {
      if (oldState.channel !== newState.channel && newState.channel !== null) {
        Haunt(newState, Users[oldState.id]);
      }
    }
  });
};
