import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'netflix'
})

AppDataSource.initialize().then(() => {
  console.log('Data source connected')
}).catch((e) => {
  console.log(e)
})

const app: express.Application = express()

const PORT = 3000

const jsonParserMiddleware = express.json()

app.use(jsonParserMiddleware)
app.use(morgan('tiny'))

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.body}`)

  next()
}

app.get('/ping', loggerMiddleware, (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query)

  res.send('pong')
})

app.post('/ping', (req: Request, res: Response) => {
  console.log(req.query, req.params, req.body)
  res.send('Usuário criado')
})

app.patch('/ping/:id', (_: Request, res: Response) => {
  res.send('Usuário atualizado')
})

app.put('/ping/:id', (_: Request, res: Response) => {
  res.send('Usuário atualizado')
})

app.delete('/ping/:id', (_: Request, res: Response) => {
  res.send('Usuário deletado')
})

app.listen(PORT, () => {
  console.log(`Example app listen on port ${PORT}`)
})
