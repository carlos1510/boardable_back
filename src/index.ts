import express from "express";
import { app } from "./app"; 
import usersRouter from "./routers/user-router";

const port = 5500;

app.use(express.json());

app.use("/users", usersRouter);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});