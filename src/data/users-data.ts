import "dotenv/config";
import { pool } from "../db";
import { User, UserParams } from "../models/user";

// Acceso a datos 
export async function getUser(id: number): Promise<User | undefined> {
  return (await pool.query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
}

export async function getUserByUserName(username: string): Promise<User | undefined> {
  return (await pool.query("SELECT * FROM users WHERE username = $1", [username])).rows[0];
}

export async function createUser(username: string, password: string, email: string, name: string): Promise<User> {
    return (await pool.query(
      "INSERT INTO users (username, password, email, name) values ($1, $2, $3, $4) RETURNING *", 
      [username, password, email, name])).rows[0];
}

export async function updateUser(id: number, password: string, email: string, name:string): Promise<User> {
  return (await pool.query(
    "UPDATE users SET password=$1, email=$2, name=$3 WHERE id=$4 RETURNING *",
    [password, email, name, id]
  )).rows[0];
}

export async function deleteUser(id: number) {
  return (await pool.query("DELETE FROM users WHERE id=$1", [id]));
}

  