const Koa = require('koa')
const logger = require('koa-http-log')

const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const db = require('./db')

const app = new Koa()
const todos = []
let ids = 0

const router = new Router()

router.get('/todos', async (ctx) => {
  const todos = await db.getAllTodos()
  ctx.body = { data: todos }
})

router.post('/todos', async (ctx) => {
  const body = ctx.request.body
  const id = await db.createTodo(body)
  const todo = await db.getTodoById(id)
  ctx.body = todo
})

router.put('/todos/:id', async (ctx) => {
  const body = ctx.request.body
  const id = await db.updateTodo(ctx.params.id, body)
  const todo = await db.getTodoById(id)

  if (!todo) {
    ctx.throw(404, 'Not Found')
    return
  }

  ctx.body = todo
})

router.delete('/todos/:id', async (ctx) => {
  await db.deleteTodo(ctx.params.id)
  ctx.status = 204
})

app.use(logger())
app.use(bodyparser())
app.use(router.routes())
app.listen(3000)
