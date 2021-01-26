import Discord from 'discord.js';
import { PervertUser } from '../models/PervertUser';

const HandlePervert = async (
  message: Discord.Message,
  Arguments: Array<string>,
): Promise<string> => {
  let userIds = message.mentions.users;

  if (userIds.array().length === 1) {
    const userId: string = userIds.array()[0].id;
    if (Arguments[1] === 'add') {
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
    } else if (Arguments[1] === 'remove') {
      await PervertUser.removeUser(userId);
      return 'removed';
    } else if (Arguments[1] === 'list') {
      const users = await PervertUser.toString();
      return users;
    } else {
      return (
        'the command is incorrect, try **' +
        process.env.COMMANDPREFIX +
        'help**'
      );
    }
  } else {
    return (
      'the command is incorrect, try **' + process.env.COMMANDPREFIX + 'help**'
    );
  }
};

export default async (message: Discord.Message): Promise<string> => {
  const Command: string = message.content.slice(1, message.content.length);
  let Arguments: Array<string> = Command.split(' ');
  console.log('args:', Arguments);

  switch (Arguments[0]) {
    case 'pervert':
      const response = await HandlePervert(message, Arguments);
      return response;
    default:
      return 'no matching command for ' + '**' + Arguments[0] + '**';
  }
};
