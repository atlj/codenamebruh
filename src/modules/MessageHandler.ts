import Discord from 'discord.js';
import Command from './Command';
import Replier from './Replier';

export default (message: Discord.Message): void => {
  if (
    message.content.indexOf(process.env.COMMANDPREFIX) === 0 &&
    message.member.hasPermission('ADMINISTRATOR')
  ) {
    Command(message.content).then((action) => {
      message.reply(action);
    });
  } else {
    const Reply: string | boolean = Replier(message.content);
    if (Reply !== false) {
      message.reply(Reply);
    }
  }
};
