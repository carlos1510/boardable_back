import * as userDB from "../data/users-data";
import { UserData } from "../models/user";

export async function getUsers() {
    const users = await userDB.getUsers();
    return users;
}

export async function createUser(userData: UserData){
    // validar reglas de negocio
    
    const newUser = await userDB.createUser(userData);
    return newUser;
}