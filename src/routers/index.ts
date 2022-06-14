import { Application, json } from 'express'
import morgan from 'morgan'
import movieRouter from './movie.router'

const routes = [
  movieRouter
]

function startRouter(app: Application) {
  const jsonParserMiddleware = json()

  app.use(jsonParserMiddleware)
  app.use(morgan('tiny'))
  app.use(routes)
}

export default startRouter
