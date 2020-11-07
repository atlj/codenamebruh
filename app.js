import Client from './src/discord/client.js';

export default (token) => {
  Client.login(token);
};
