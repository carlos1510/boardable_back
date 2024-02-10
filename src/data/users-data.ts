import { query } from "../db/db";
import { User, UserData } from "../models/user";

// Acceso a datos 
export async function getUsers(): Promise<User[]> {
    const result = await query("SELECT * FROM users;");
    return result.rows;
}

export async function getUser(id: string): Promise<User> {
  const result = await query("SELECT * FROM users WHERE id = $1;", [id]);
  return result.rows[0];
}

export async function createUser(data: UserData): Promise<User> {
    const result = await query(
      "INSERT INTO users (name, email) values ($1, $2) RETURNING *;", 
      [data.name, data.email]);
    return result.rows[0];
}

  