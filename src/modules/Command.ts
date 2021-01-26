import { FindUserID } from '../discord/Client';
import { PervertUser } from '../models/PervertUser';

export default async (message: string): Promise<string> => {
  const Command: string = message.slice(1, message.length);
  const Arguments: Array<string> = Command.split(' ');
  console.log('args:', Arguments);

  switch (Arguments[0]) {
    case 'pervert':
      if (Arguments[1] === 'add') {
        if (Arguments[3] === 'tts') {
          await PervertUser.createUser(
            FindUserID(Arguments[2]),
            'tts',
            Arguments.splice(4, Arguments.length - 4).join(' '),
          );
        } else {
          await PervertUser.createUser(
            FindUserID(Arguments[2]),
            Arguments[3],
            '',
          );
        }
        return 'added';
      } else if (Arguments[1] === 'remove') {
        await PervertUser.removeUser(FindUserID(Arguments[2]));
        return 'removed';
      } else if (Arguments[1] === 'list') {
        const users = await PervertUser.toString();
        return users;
      }
      break;

    default:
      break;
  }
};
