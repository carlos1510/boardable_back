import express from "express";
import { getUsers, createUser } from "../services/users-service";
import { UserData } from "../models/user";

const usersRouter = express.Router();
// Presentacion
usersRouter.get("/", async (_req, res) => {
  try{
    const users = await getUsers();
    res.json(users);
  }catch(error){
    res.status(500).send("Error al obtener los usuarios");
  }
});


usersRouter.post("/", async (req, res) => {
  try{
    // validacion de input de usuario
    const userData: UserData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  }catch(error){
    res.status(500).send("Error al crear el usuario");
  }
});

export default usersRouter;