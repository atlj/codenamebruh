import CurrencyReplies from "../config/currency/replies.json"
import CurrencyKeywords from "../config/currency/keywords.json"


const Randomiser = (list:Array<string>):string => {
    return list[Math.floor(Math.random() * list.length)];
  };

export default (message:string):string|boolean=>{
        for (let index = 0; index < CurrencyKeywords.length; index++) {
            if (message.includes(CurrencyKeywords[index])){
                return Randomiser(CurrencyReplies)
            }
        }
        return false
}



