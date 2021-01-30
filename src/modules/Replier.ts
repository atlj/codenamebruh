import { CURRENCY_REPLIES, CURRENCY_KEYWORDS } from '@/utils/Constants';

export default (message: string): string | undefined => {
  if (message.split(' ').some((e) => CURRENCY_KEYWORDS.includes(e))) {
    return CURRENCY_REPLIES.sample();
  }
};
