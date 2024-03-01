import express from "express";
import { createBoard, getBoards } from "../services/boards-service";
import { validationHandler } from "../middlewares/validation";
import { ZodError } from "zod";
import { boardSchema } from "../models/board";
import { authenticateHandler } from "../middlewares/authenticate";

const boardRouter = express.Router();

boardRouter.post("/", authenticateHandler, validationHandler(boardSchema), async (req, res) => {
    try{
        const userId = req.userId as number;
        const boardData = boardSchema.parse(req.body);
        const newBoard = await createBoard(boardData, userId);

        res.status(201).json(newBoard);
    }catch(error){
        if(error instanceof ZodError){
            res.status(400).send(error.errors);
          }
          res.status(500).send("Error al crear el Board");
    }
});

boardRouter.post("/getBoards", authenticateHandler, async (req, res) => {
    try{
        const sort = req.body;
        const boards = await getBoards(sort);
        res.json({
        ok: true,
        data: boards,
        });
    }catch(error){
        res.status(500).send("Error al obtener el listado de Boards");
    }
})

export default boardRouter;