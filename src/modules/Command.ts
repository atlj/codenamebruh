import { FindUserID } from '../discord/Client';
import { PervertUser } from '../models/PervertUser';

const HandlePervert = async (Arguments: Array<string>) => {
  if (Arguments[1] === 'add') {
    const userId = FindUserID(Arguments[2]);
    if (userId !== false) {
      if (Arguments[3] === 'tts') {
        await PervertUser.createUser(
          userId,
          'tts',
          Arguments.splice(4, Arguments.length - 4).join(' '), //joins the sentence which will be used by tts
        );
      } else {
        //TODO: add control to what can get added besides tts i.e.: obama and bruh can be added for now
        await PervertUser.createUser(userId, Arguments[3], '');
      }
      return 'added';
    } else {
      return 'no user named **' + Arguments[2] + '**';
    }
  } else if (Arguments[1] === 'remove') {
    const userId = FindUserID(Arguments[2]);
    if (userId !== false) {
      await PervertUser.removeUser(userId);
      return 'removed';
    } else {
      return 'no user named **' + Arguments[2] + '**';
    }
  } else if (Arguments[1] === 'list') {
    const users = await PervertUser.toString();
    return users;
  } else {
    return (
      'the command is incorrect, try **' + process.env.COMMANDPREFIX + 'help**'
    );
  }
};

export default async (message: string): Promise<string> => {
  const Command: string = message.slice(1, message.length);
  const Arguments: Array<string> = Command.split(' ');
  console.log('args:', Arguments);

  switch (Arguments[0]) {
    case 'pervert':
      const response = await HandlePervert(Arguments);
      return response;
    default:
      return 'no matching command for ' + '**' + Arguments[0] + '**';
  }
};
