import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { createConnection, Connection, getConnection } from 'typeorm';
import { PervertUser } from '../models/PervertUser';

const ConnectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  ssl: true,
  url: process.env.DATABASEURL,
  entities: [PervertUser],
  synchronize: true,
};
export const ConnectDB = async () => {
  let connection: Connection | undefined;
  try {
    connection = getConnection();
  } catch (error) {}
  try {
    if (connection && !connection.isConnected) {
      await connection.connect();
    } else {
      await createConnection(ConnectionOptions);
    }
    console.log('Connected to database.');
  } catch (error) {
    console.error('Database threw error');
    throw error;
  }
};
