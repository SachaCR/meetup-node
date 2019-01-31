const sqlite3 = require('sqlite3')
const dbClient = new sqlite3.Database('./database/todos.db')

dbClient.exec(`
DROP TABLE IF EXISTS todos;

CREATE TABLE todos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label VARCHAR(255),
  done BOOL
);
`)
