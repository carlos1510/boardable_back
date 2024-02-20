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