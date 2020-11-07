import {
  currency_replies,
  currency_keywords,
  help_keywords,
  help_replies,
} from '../../config/reply/Reply.js';

const randomiser = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

export default (message) => {
  for (let index = 0; index < currency_keywords.length; index++) {
    if (message.includes(currency_keywords[index])) {
      return randomiser(currency_replies);
    }
  }
  for (let index = 0; index < help_keywords.length; index++) {
    console.log(message, help_keywords[index]);
    if (message === help_keywords[index]) {
      return randomiser(help_replies);
    }
  }

  return false;
};
