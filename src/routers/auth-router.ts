import express from "express";
import { createUser, validateCredentials } from "../services/users-service";
import jwt from "jsonwebtoken";
import { validationHandler } from "../middlewares/validation";
import { userSchema } from "../models/user";

const jwtSecret = "ultra-secret";

const authRouter = express.Router();

authRouter.post("/singnup",  validationHandler(userSchema), async (req, res, next) => {
 
    try{
            const newUser = await createUser(req.body);
            res.status(201).json({
                ok: true,
                data: newUser,
            });
        }catch(error){
            next(error);
        }
    }
)

authRouter.post("/login", async (req, res, next) => {
    try{
        
        const user = await validateCredentials(req.body);

        const payload = { userId: user.id };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: "15m" });

        //req.session.userId = user.id;
        res.json({ ok:true, message: "Login exitoso", data: { token } });
    }catch(error){
        next(error);
    }
});

authRouter.post("/logout", (req, res, next) => {
    req.session.destroy((error) => {
        if(error) {
            next(error);
        }else {
            res.clearCookie("connect.sid");
            res.json({ ok: true, message: "Logout exitoso" });
        }
    });
});

export default authRouter;