import express from "express";

import { getUsers, createUser } from "../services/users-service";
import { UserData, UserSchema } from "../models/user";
import { ZodError } from "zod";

const usersRouter = express.Router();
// Presentacion
usersRouter.get("/", async (_req, res) => {
  try{
    const users = await getUsers();
    res.json({
      ok: true,
      data: users,
    });
  }catch(error){
    res.status(500).send("Error al obtener los usuarios");
  }
});


usersRouter.post("/", async (req, res) => {
  try{
    // validacion de input de usuario
    const userData = UserSchema.parse(req.body);
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  }catch(error){
    if(error instanceof ZodError){
      res.status(400).send(error.errors);
    }
    res.status(500).send("Error al crear el usuario");
  }
});

export default usersRouter;