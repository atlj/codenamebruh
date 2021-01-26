import { REPLIES, CURRENCY_KEYWORDS } from '@/utils/constants';

export default (message: string): string | undefined => {
  if (message.split(' ').some((e) => CURRENCY_KEYWORDS.includes(e))) {
    return REPLIES.sample();
  }
};
