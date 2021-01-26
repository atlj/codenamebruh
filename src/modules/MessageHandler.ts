import Discord from 'discord.js';
import Command from './Command';
import Replier from './Replier';

export default (message: Discord.Message): void => {
  if (
    message.content.indexOf(process.env.COMMANDPREFIX) === 0 &&
    message.member.hasPermission('ADMINISTRATOR')
  ) {
    Command(message).then((action) => {
      message.reply(action);
    });
  } else {
    const reply = Replier(message.content);
    if (reply) {
      message.reply(reply);
    }
  }
};
