import Discord from 'discord.js';

//Slices the command into tokens.
//command arg1 arg2 => ["command", "arg1", "arg2"]
const lexer = (command: string): Array<string> => {
  command = command.slice(1, command.length); //Remove prefix

  return command.split(' '); //Split the string by spaces.
};

const log = (tolog) => {
  console.log(tolog);
};

type argumentType =
  | 'optional'
  | 'required'
  | 'long'
  | 'optional branch'
  | 'required branch';

class Argument {
  type: argumentType;
  field: Array<string>;
  branches: Array<Branch> | false;
  constructor(
    type: argumentType,
    field: Array<string>,
    branches: Array<Branch> | false = false,
  ) {
    this.type = type;
    this.field = field;
    this.branches = branches;
  }
  branchcheck(
    branchname: string,
    lexedCommand: Array<string>,
    message: Discord.Message,
  ): true | string {
    return this.branches[this.field.indexOf(branchname)].checker(
      lexedCommand,
      message,
    );
  }
}

class Branch {
  argumentList: Array<Argument>;
  constructor(argumentList: Argument[]) {
    this.argumentList = argumentList;
  }
  checker(
    lexedCommand: Array<string>,
    message: Discord.Message,
  ): string | true {
    for (let index = 0; index < this.argumentList.length; index++) {
      const element: Argument = this.argumentList[index];
      log('\n');
      log('current arg: ' + lexedCommand[index]);
      //Required Args
      log('type of arg: ' + element.type);
      if (element.type === 'required') {
        //If the arg is blank
        if (lexedCommand[index] === undefined) {
          log('the argument is undefined, lexedCommand is: ' + lexedCommand);
          return (
            'Command is incomplete.you need to give one of these arguments: **' +
            element.field.toString() +
            '**'
          );
        }
        //Checks if a userid is given via mention
        if (element.field.indexOf('$userid') !== -1) {
          if (message.mentions.users.array().length !== 1) {
            return 'To complete the operation you need to mention a user.';
          }
        }
        //from now on there is else if because we do not want program to check the field variable
        else if (element.field.indexOf('$youtubelink') !== -1) {
          //TODO
        }
        //If the given arg doesnt match any of the predefined ones
        else if (element.field.indexOf(lexedCommand[index]) === -1) {
          log(
            'given argument doesnt match any of the predefined ones. given argument: ' +
              lexedCommand[index],
          );
          log(element.field);
          log(lexedCommand);
          log(lexedCommand[index]);
          return (
            'Given argument is incorrect (**' +
            lexedCommand[index] +
            '**). You need to use one of these arguments instead: **' +
            element.field.toString() +
            '**'
          );
        }
        //Required branches
      } else if (element.type === 'required branch') {
        //If the arg is blank
        if (lexedCommand[index] === undefined) {
          return (
            'Command is incomplete.you need to give one of these arguments: **' +
            element.field.toString() +
            '**'
          );
        }
        //If the given arg doesnt match any of the predefined ones
        if (element.field.indexOf(lexedCommand[index]) === -1) {
          return (
            'Given argument is incorrect (**' +
            lexedCommand[index] +
            '**). You need to use one of these arguments instead: **' +
            element.field.toString() +
            '**'
          );
        }
        log('running branch checker, this triggered: ' + lexedCommand[index]);
        log(
          'putting this list to test: ' +
            lexedCommand.slice(index, lexedCommand.length),
        );
        let branchcheck = element.branchcheck(
          lexedCommand[index],
          lexedCommand.slice(index, lexedCommand.length),
          message,
        );
        if (branchcheck !== true) {
          return branchcheck;
        }
        //Long args (more than one token)
      } else if (element.type === 'long') {
        if (lexedCommand[index] === undefined) {
          //Fields of long arguments is for description so if an illegal arg is given, checker throws the description
          return (
            'Command is incomplete. You need to give an argument for: ' +
            element.field.toString()
          );
        }
      } else if (element.type === 'optional') {
        if (lexedCommand[index] !== undefined) {
          if (element.field.indexOf('$float') !== -1) {
            if (isNaN(Number.parseFloat(lexedCommand[index]))) {
              return (
                'Command is incorrect. You needed to input a number instead of: **' +
                lexedCommand[index] +
                '**'
              );
            }
          } else if (element.field.indexOf('$margin') !== -1) {
            if (lexedCommand[index].indexOf('-') === -1) {
              return (
                'Command is incorrect. You needed to input a margin instead of: **' +
                lexedCommand[index] +
                '**\n an example would be: **5.5-9**'
              );
            }
            const startEndArray: string[] = lexedCommand[index].split('-');
            if (
              Number.isNaN(Number.parseFloat(startEndArray[0])) ||
              Number.isNaN(Number.parseFloat(startEndArray[1]))
            ) {
              return (
                'Command is incorrect. You needed to input a margin instead of: **' +
                lexedCommand[index] +
                '**\n an example would be: **5.5-9**'
              );
            }
          }
        }
        //else if (element.type==="optional branch"){}
      }
      return true;
    }
  }
}

class Command {
  argumentList: Array<Argument>;
  constructor(argumentList: Argument[]) {
    this.argumentList = argumentList;
  }
  checker(
    lexedCommand: Array<string>,
    message: Discord.Message,
  ): string | true {
    for (let index = 0; index < this.argumentList.length; index++) {
      const element: Argument = this.argumentList[index];
      log('\n');
      log('current arg: ' + lexedCommand[index]);
      //Required Args
      log('type of arg: ' + element.type);
      if (element.type === 'required') {
        //If the arg is blank
        if (lexedCommand[index] === undefined) {
          log('the argument is undefined, lexedCommand is: ' + lexedCommand);
          return (
            'Command is incomplete.you need to give one of these arguments: **' +
            element.field.toString() +
            '**'
          );
        }
        //Checks if a userid is given via mention
        if (element.field.indexOf('$userid') !== -1) {
          if (message.mentions.users.array().length !== 1) {
            return 'To complete the operation you need to mention a user.';
          }
        }
        //from now on there is else if because we do not want program to check the field variable
        else if (element.field.indexOf('$youtubelink') !== -1) {
          //TODO
        }
        //If the given arg doesnt match any of the predefined ones
        else if (element.field.indexOf(lexedCommand[index]) === -1) {
          log(
            'given argument doesnt match any of the predefined ones. given argument: ' +
              lexedCommand[index],
          );
          log(element.field);
          log(lexedCommand);
          log(lexedCommand[index]);
          return (
            'Given argument is incorrect (**' +
            lexedCommand[index] +
            '**). You need to use one of these arguments instead: **' +
            element.field.toString() +
            '**'
          );
        }
        //Required branches
      } else if (element.type === 'required branch') {
        //If the arg is blank
        if (lexedCommand[index] === undefined) {
          return (
            'Command is incomplete.you need to give one of these arguments: **' +
            element.field.toString() +
            '**'
          );
        }
        //If the given arg doesnt match any of the predefined ones
        if (element.field.indexOf(lexedCommand[index]) === -1) {
          return (
            'Given argument is incorrect (**' +
            lexedCommand[index] +
            '**). You need to use one of these arguments instead: **' +
            element.field.toString() +
            '**'
          );
        }
        log('running branch checker, this triggered: ' + lexedCommand[index]);
        log(
          'putting this list to test: ' +
            lexedCommand.slice(index, lexedCommand.length),
        );
        let branchcheck = element.branchcheck(
          lexedCommand[index],
          lexedCommand.slice(index, lexedCommand.length),
          message,
        );
        if (branchcheck !== true) {
          return branchcheck;
        }
        //Long args (more than one token)
      } else if (element.type === 'long') {
        if (lexedCommand[index] === undefined) {
          //Fields of long arguments is for description so if an illegal arg is given, checker throws the description
          return (
            'Command is incomplete. You need to give an argument for: ' +
            element.field.toString()
          );
        }
      } else if (element.type === 'optional') {
        if (lexedCommand[index] !== undefined) {
          if (element.field.indexOf('$float') !== -1) {
            if (isNaN(Number.parseFloat(lexedCommand[index]))) {
              return (
                'Command is incorrect. You needed to input a number instead of: **' +
                lexedCommand[index] +
                '**'
              );
            }
          } else if (element.field.indexOf('$margin') !== -1) {
            if (lexedCommand[index].indexOf('-') === -1) {
              //TODO: THIS IS NOT WORKING
              return (
                'Command is incorrect. You needed to input a margin instead of: **' +
                lexedCommand[index] +
                '**\n an example would be: **5.5-9**'
              );
            }
            const startEndArray: string[] = lexedCommand[index].split('-');
            if (
              Number.isNaN(Number.parseFloat(startEndArray[0])) ||
              Number.isNaN(Number.parseFloat(startEndArray[1]))
            ) {
              return (
                'Command is incorrect. You needed to input a margin instead of: **' +
                lexedCommand[index] +
                '**\n an example would be: **5.5-9**'
              );
            }
          }
        }
        //else if (element.type==="optional branch"){}
      }
      return true;
    }
  }
}
export { Command, Branch, Argument, lexer };
