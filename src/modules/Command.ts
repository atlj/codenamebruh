import Discord from 'discord.js';
import { PervertUser } from '../models/PervertUser';
import { lexer } from './Parser';
import { pervertCommand } from './Pervert';
import { youtubeCommand, YoutubePlayer } from './Youtube';

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

const HandleYoutube = async (
  message: Discord.Message,
  Arguments: Array<string>,
) => {
  //A is capital on Arguments because of typescript
  const player = new YoutubePlayer(message);
  const searchResult = await player.search(
    Arguments.splice(1, Arguments.length).join(' '),
  );
  player.connect().then(() => {
    player.play(searchResult.url);
  });
};

export default async (message: Discord.Message): Promise<string> => {
  let Arguments = lexer(message.content);
  console.log('args:', Arguments);

  switch (Arguments[0]) {
    case 'pervert':
      let pervertResult: true | string;
      let pervertResponse: string;
      pervertResult = pervertCommand.checker(lexer(message.content), message);
      pervertResult === true
        ? (pervertResponse = 'Added')
        : (pervertResponse =
            pervertResult +
            '\n``You can type ' +
            process.env.COMMANDPREFIX +
            'help for further information``');
      //const response = await HandlePervert(message, Arguments);
      return pervertResponse;
    case 'play':
    case 'p':
      let youtubeResult: true | string;
      let youtubeResponse: string;
      youtubeResult = youtubeCommand.checker(lexer(message.content), message);
      if (youtubeResult === true) {
        youtubeResponse = ':ok_hand:';
        HandleYoutube(message, Arguments);
      } else {
        youtubeResponse =
          youtubeResult +
          '\n``You can type ' +
          process.env.COMMANDPREFIX +
          'help for further information``';
      }
      return youtubeResponse;
    default:
      return (
        'no matching command for ' +
        '**' +
        Arguments[0] +
        '**' +
        '\n``You can type ' +
        process.env.COMMANDPREFIX +
        'help for further information``'
      );
  }
};
