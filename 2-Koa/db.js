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

async function updateTodo() {
  return new Promise((resolve, reject) => {

  })
}

async function deleteTodo() {
  return new Promise((resolve, reject) => {

  })
}

async function createTodo(data) {
  return new Promise((resolve, reject) => {

  })
}

async function getTodoById(id) {
  return new Promise((resolve, reject) => {

  })
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
}
