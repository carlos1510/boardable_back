import "dotenv/config";
import { pool } from "../db";
import { Board } from "../models/board";

export async function createBoard(name_title: string, color: string, id_user: number): Promise<Board>{
    return (
        await pool.query("INSERT INTO boards(name_title, color, id_user, create_at, update_at) values ($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING *", 
        [name_title, color, id_user, null])
        ).rows[0];
    
};