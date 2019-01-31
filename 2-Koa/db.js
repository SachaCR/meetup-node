const sqlite3 = require('sqlite3')

const dbClient = new sqlite3.Database('./database/todos.db')

async function getAllTodos() {
  return new Promise((resolve, reject) => {
    dbClient.all('SELECT * FROM todos;', (err, rows) => {
      if (err) {
        return reject(err)
      }
      return resolve(rows)
    })
  })
}

async function updateTodo(id, data) {
  return new Promise((resolve, reject) => {
    dbClient.run('UPDATE todos SET label = ?, done = ? WHERE id = ?', [data.label, data.done, id], function updateTodo(err) {
      if (err) {
        return reject(err)
      }
      return resolve(id)
    })
  })
}

async function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    dbClient.run('DELETE FROM todos WHERE id = ?', [id], function updateTodo(err) {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

async function createTodo(data) {
  return new Promise((resolve, reject) => {
    dbClient.run('INSERT INTO todos (label, done) VALUES (?,?);', [ data.label, data.done ], function createTodo(err) {
      if (err) {
        return reject(err)
      }

      return resolve(this.lastID)
    })
  })
}

async function getTodoById(id) {
  return new Promise((resolve, reject) => {
    dbClient.all('SELECT * FROM todos WHERE id = ?;', [id], (err, rows) => {
      if (err) {
        return reject(err)
      }
      return resolve(rows[0])
    })
  })
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
}
