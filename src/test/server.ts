import express from 'express'
import multer from 'multer'
import path from 'path'
import env from './env'
import spdy from 'spdy'
import fs from 'fs'
import throttle from 'express-throttle-bandwidth'

const pr = (...p: string[]) => path.resolve(__dirname, ...p)
const app = express()
const server = spdy.createServer(
  {
    key: fs.readFileSync(pr('../../localhost-key.pem')),
    cert: fs.readFileSync(pr('../../localhost.pem')),
  },
  app
)

// cors
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})
// app.use(throttle(100000))

const upload = multer({
  dest: pr('./uploads'),
})

app.get('/', (req, res) => {
  res.send('server running')
})
app.post('/upload', upload.single('file'), (req, res, next) => {
  let file = req.file
  console.log('get file', file, 'body', req.body)
  res.send({ type: 'ok' })
})
app.use('/file', express.static(pr('./static')))

server.listen(env.port, () =>
  console.log(`server running in https://localhost:${env.port}`)
)
