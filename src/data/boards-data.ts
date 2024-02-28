import "dotenv/config";
import { pool } from "../db";
import { Board } from "../models/board";

export async function createBoard(name_title: string, id_user: number): Promise<Board>{
    return (
        await pool.query("INSERT INTO boards(name_title, id_user, create_at, update_at) values ($1, $2, CURRENT_TIMESTAMP, $3) RETURNING *", 
        [name_title, id_user, null])).rows[0];
    
};