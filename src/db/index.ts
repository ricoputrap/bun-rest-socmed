import Database from "bun:sqlite";

const db: Database = new Database("./db.sqlite");

export default db