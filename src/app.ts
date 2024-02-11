import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv"; 
import { usersRouter } from "./routers/user-router";

if(process.env["NODE_ENV"] === 'test'){
    configDotenv({ path: ".env.test" });
}else{
    configDotenv();
}

export const app = express();
export const router = express.Router();

var corsOptions = {
    origin: process.env["CLIENT_ORIGIN"],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json());

app.use("/users", usersRouter);

app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
)

app.get("/", (req, res) => {
    res.json({ test: "Hola mundo!" });
})