import { REPLIES } from '@/utils/constants';
import CurrencyKeywords from '../config/currency/keywords.json';

export default (message: string): string | boolean => {
  for (let index = 0; index < CurrencyKeywords.length; index++) {
    if (message.includes(CurrencyKeywords[index])) {
      return REPLIES.sample();
    }
  }
  return false;
};
