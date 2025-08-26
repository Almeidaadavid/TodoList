import 'dotenv/config'
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';

const port = process.env.DB_PORT as number | undefined
const sync = process.env.DB_SYNC as boolean | undefined


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: sync,  
    entities: [join(__dirname, '/entities/*.{ts,js}')],
    migrations: [join(__dirname, '/migrations/*.{ts,js}')],
})
