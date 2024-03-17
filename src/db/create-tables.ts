import db from ".";

export const createTables = async () => {
  console.log("Creating 'user' table if not exists...");
  db.query(`
    CREATE TABLE IF NOT EXISTS "user" (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    profile_picture TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')) 
  )`).run();
  db.query('CREATE UNIQUE INDEX IF NOT EXISTS user_id_IDX ON "user" (id)').run();
  db.query('CREATE UNIQUE INDEX IF NOT EXISTS user_username ON "user" (username)').run();
  db.query('CREATE UNIQUE INDEX IF NOT EXISTS user_email ON "user" (email)').run();
  console.log("Done creating 'user' table if not exists!");
}

createTables();