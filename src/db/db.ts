import { Pool } from "pg";

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'test-api',
    user: 'postgres',
    password: '12345'
});

export const query = (text: string, params?: string[]) => {
    return pool.query(text, params);
}