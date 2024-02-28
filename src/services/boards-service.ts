import * as boardData from "../data/boards-data";
import { ApiError } from "../middlewares/error";
import { Board, BoardParams } from "../models/board";

export async function createBoard(data: BoardParams, id_user: number): Promise<Board> {
    const { name_title } = data;

    const newBoard = await boardData.createBoard(name_title, id_user);
   
    return newBoard;
}