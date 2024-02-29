import * as boardData from "../data/boards-data";
import { ApiError } from "../middlewares/error";
import { Board, BoardParams } from "../models/board";

export async function createBoard(data: BoardParams, id_user: number): Promise<Board> {
    const { name_title, color } = data;

    const newBoard = await boardData.createBoard(name_title, color, id_user);
   
    return newBoard;
}

export async function getBoards(sort?: string): Promise<Board[]> {
    const boards = await boardData.getBoards(sort);
    return boards;
}