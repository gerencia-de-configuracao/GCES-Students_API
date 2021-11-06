import { Student } from '../entities/Student';
import { createConnection, ConnectionOptions } from 'typeorm';

export const setupConnection = async () => {
  const config: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Student],
    synchronize: true,
  };

  const withSSL = { ssl: { rejectUnauthorized: false } };
  const withoutSSL = { ssl: false };

  if (process.env.NODE_ENV === 'production') {
    return createConnection({ ...config, ...withSSL });
  }

  return createConnection({ ...config, ...withoutSSL });
};
