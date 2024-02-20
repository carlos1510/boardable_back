import "dotenv/config";
import { pool } from "../db";
import { User, UserData } from "../models/user";

// Acceso a datos 
export async function getUsers(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users;");
    return result.rows;
}

export async function getUser(id: string): Promise<User> {
  const result = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
  return result.rows[0];
}

export async function createUser(data: UserData): Promise<User> {
    const result = await pool.query(
      "INSERT INTO users (username, name, email, password) values ($1, $2, $3, $4) RETURNING *;", 
      [data.username, data.password]);
    return result.rows[0];
}

  