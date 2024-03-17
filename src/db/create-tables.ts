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
  db.query('CREATE UNIQUE INDEX IF NOT EXISTS user_username_IDX ON "user" (username)').run();
  db.query('CREATE UNIQUE INDEX IF NOT EXISTS user_email_IDX ON "user" (email)').run();
  console.log("Done creating 'user' table if not exists!");

  console.log("Creating 'post' table if not exists...");
  db.query(`
    CREATE TABLE IF NOT EXISTS "post" (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      mood INTEGER NOT NULL DEFAULT 2,
      privacy INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      user_id INTEGER NOT NULL REFERENCES "user" (id)
    )`).run();
  db.query('CREATE UNIQUE INDEX IF NOT EXISTS post_id_IDX ON "post" (id)').run();
  db.query('CREATE INDEX IF NOT EXISTS post_created_at_IDX ON "post" (created_at)').run();
  db.query('CREATE INDEX IF NOT EXISTS post_mood_IDX ON "post" (mood)').run();
  db.query('CREATE INDEX IF NOT EXISTS post_user_id_IDX ON "post" (user_id)').run();
  console.log("Done creating 'post' table if not exists!");
}

createTables();