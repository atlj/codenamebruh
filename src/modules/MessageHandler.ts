import Discord from 'discord.js';
import Command from './Command';
import Replier from './Replier';
import TTEN from './TTEN';

export default (message: Discord.Message): void => {
  if (
    message.content.indexOf(process.env.COMMANDPREFIX) === 0 &&
    //TODO add permission system
    message.member.hasPermission('ADMINISTRATOR')
  ) {
    Command(message).then((action) => {
      message.reply(action);
    });
  } else {
    const Reply: string | boolean = Replier(message.content);
    if (Reply !== false) {
      message.reply(Reply);
    }
  }
  if (message.member.voice.channel) {
    if (
      message.content.split(' ')[message.content.split(' ').length - 1] ===
        'tten' ||
      message.content.split(' ')[message.content.split(' ').length - 1] ===
        'TTEN'
    ) {
      message.reply(message.content + ' verdi verdi verdi');
      TTEN(
        message.content.split(' ').slice(0, -2).join(' '),
        message.member.voice.channel,
      );
    }
  }
};
