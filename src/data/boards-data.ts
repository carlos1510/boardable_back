import "dotenv/config";
import * as db from "../db";
import { Board } from "../models/board";

export async function createBoard(name_title: string, color: string, id_user: number): Promise<Board>{
    return (
        await db.query("INSERT INTO boards(name_title, color, id_user, create_at, update_at) values ($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING *", 
        [name_title, color, id_user, null])
        ).rows[0];
    
};

export async function getBoards(sort?: string): Promise<Board[]> {
    let query = "SELECT id, name_title, color, id_user FROM boards";
    // Sorting
    //query = db.sorting(query, sort);
    
    console.log(query);
    const result = db.query(query);

    return (await result).rows;
}