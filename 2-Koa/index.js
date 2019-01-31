const Koa = require('koa')
const logger = require('koa-http-log')

const app = new Koa()
const todos = []

app.use(logger())
app.listen(3000)
