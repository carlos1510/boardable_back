import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INTEGER,
    category VARCHAR(255)
);
`);
};

const create_board = 'CREATE TABLE boards (	id SERIAL PRIMARY KEY,	name_title VARCHAR(100), color VARCHAR(15),	id_user INTEGER,	create_at timestamp,	update_at timestamp,	CONSTRAINT usersID  FOREIGN KEY(id_user)        REFERENCES users(id) )´;

export const down: Migration = async (params) => {
  return params.context.query(`DROP TABLE products;`);
};


/*import { Migration } from "../scripts/dbMigrate"; 

export const up: Migration = async (params) => {
    params.context.query(`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL
    );
    `);
};

export const down: Migration = async (params) => {
    return params.context.query(`DROP TABLE users;`);
}*/