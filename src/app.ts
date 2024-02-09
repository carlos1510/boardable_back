import express from "express";
import cors from "cors";

export const app = express();
export const router = express.Router();

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.json({ test: "Hola mundo!" });
})