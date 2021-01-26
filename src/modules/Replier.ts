import { REPLIES, CURRENCY_KEYWORDS } from '@/utils/constants';

export default (message: string): string | false => {
  if (message.split(' ').some((e) => CURRENCY_KEYWORDS.includes(e))) {
    return REPLIES.sample();
  }
};
