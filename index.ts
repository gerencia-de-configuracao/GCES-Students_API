import app from './src/server';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { setupConnection } from './src/db/config';

dotenv.config();

const port = process.env.PORT || '5000';

setupConnection();

app.listen(port, () =>
  console.log(`This beautiful and updated server is running on port ${port}`)
);
