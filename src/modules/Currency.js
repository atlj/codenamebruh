import {convertCurrency} from 'currencies-exchange-rates';

export default convert = (amount, currency, convertedcurrency) => {
  return convertCurrency(currency, convertCurrency, amount);
};
