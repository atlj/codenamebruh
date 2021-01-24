import Client from './discord/Client';

export default (token: string): void => {
  Client.login(token).then(() => console.log("Connected to server"));
};
