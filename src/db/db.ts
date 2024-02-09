import { Pool } from "pg";

const pool = new Pool();

export const query = (text: string, params?: string[]) => {
    return pool.query(text, params);
}