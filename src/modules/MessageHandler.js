import Replier from './Replier.js';

export default (message) => {
  const reply = Replier(message.content);
  if (reply !== false) {
    message.reply(reply);
  }
};
