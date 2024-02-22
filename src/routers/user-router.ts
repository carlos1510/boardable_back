import express from "express";
import { createUser, getUser } from "../services/users-service";
import { userSchema } from "../models/user";
import { ZodError } from "zod";
import { ApiError } from "../middlewares/error";
import { authenticateHandler } from "../middlewares/authenticate";

const usersRouter = express.Router();

usersRouter.get("/", authenticateHandler, async (req, res, next) => {
  const userId = req.userId as number;
  const user = await getUser(userId);
  
  if(user){
    res.json({ok: true, message: "Usuario encontrado", data: user});
  }else{
    next(new ApiError("No autorizado", 401));
  }
  
})

// Presentacion
/*usersRouter.get("/", async (_req, res) => {
  try{
    const users = await getUsers();
    res.json({
      ok: true,
      data: users,
    });
  }catch(error){
    res.status(500).send("Error al obtener los usuarios");
  }
});*/


usersRouter.post("/", async (req, res) => {
  try{
    // validacion de input de usuario
    const userData = userSchema.parse(req.body);
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