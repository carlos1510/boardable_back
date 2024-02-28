import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import sessionHandler from "./middlewares/session";
import authRouter from "./routers/auth-router";
import userRouter from "./routers/user-router";
import boardRouter from "./routers/board-router";
import errorHandler from "./middlewares/error";
import { configDotenv } from "dotenv";
import { pool } from "./db";

const port = process.env["PORT"] || 5500;

if(process.env["NODE_ENV"] === "test"){
  configDotenv({ path: ".env.test" });
}else {
  configDotenv();
}

const gracefulShutdown = () => {
  pool.end(() => {
    console.log("\nApplication enden gracefully");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

const app = express();

const corsOptiones = {
  origin: process.env["CLIENT_ORIGIN"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptiones));
app.use(cookieParser());
app.use(express.json());
app.use(sessionHandler());

app.use(authRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});