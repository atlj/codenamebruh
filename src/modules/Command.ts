import {FindUserID} from '../discord/Client';
import {
  AddUsertoPervertList,
  RemoveUserfromPervertList,
  ListUsers,
} from './Pervert';

export default (message: string): string => {
  const Command: string = message.slice(1, message.length);
  const Arguments: Array<string> = Command.split(' ');
  console.log('args:', Arguments);

  switch (Arguments[0]) {
    case 'pervert':
      if (Arguments[1] === 'add') {
        if (Arguments[3] === 'tts') {
          AddUsertoPervertList(FindUserID(Arguments[2]), {
            mode: Arguments[3],
            data: Arguments.splice(4, Arguments.length - 4).join(' '),
          });
        } else {
          AddUsertoPervertList(FindUserID(Arguments[2]), {
            mode: Arguments[3],
          });
        }
        return 'added';
      } else if (Arguments[1] === 'remove') {
        RemoveUserfromPervertList(FindUserID(Arguments[2]));
        return 'removed';
      } else if (Arguments[1] === 'list') {
        return ListUsers();
      }
      break;

    default:
      break;
  }
};
