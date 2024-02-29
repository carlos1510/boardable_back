import "dotenv/config";
import { Client, Pool } from "pg";

export const pool = new Pool({
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["PGDATABASE"],
  user: process.env["PGUSER"],
  password: process.env["PGPASSWORD"],
});

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};

export const sorting = (query: string, sort?: string): string => {
  if (sort) {
    const [sortCol, sortDir] = sort.split("_");
    query += ` ORDER BY "${sortCol}" ${sortDir?.toUpperCase() || "ASC"}`;
  }
  return query;
}

export const adminClient = new Client({
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["PGDATABASE"],
  user: process.env["PGUSER"],
  password: process.env["PGPASSWORD"],
});