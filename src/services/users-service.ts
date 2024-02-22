import bcrypt from "bcrypt";
import * as userDB from "../data/users-data";
import { ApiError } from "../middlewares/error";
import { User, UserParams } from "../models/user";

export async function getUser(id: number): Promise<User | undefined> {
    return await userDB.getUser(id);
}

export async function createUser(data: UserParams): Promise<User> {
    const { username, password, email } = data;
  
    const user = await userDB.getUserByUserName(username);
  
    if (user) {
      throw new ApiError("El correo ya está registrado", 400);
    }
  
    const costFactor = 10;
    const hashedPassword = await bcrypt.hash(password, costFactor);
    const newUser = await userDB.createUser(username, hashedPassword, email);
   
    return newUser;
}

export async function validateCredentials(credentials: UserParams): Promise<User> {
    const { username, password} = credentials;
    const user = await userDB.getUserByUserName(username);

    const isValid = await bcrypt.compare(password, user?.password || "");

    if(!user || !isValid){
        throw new ApiError("Credenciales incorrectas", 400);
    }
    
    return user;

}