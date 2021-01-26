import Client from './discord/Client';
import 'reflect-metadata';
import { ConnectDB } from './services/Database';

export default (token: string): void => {
  ConnectDB().then(() => {
    Client.login(token).then(() => console.log('Connected to server'));
  });
};
