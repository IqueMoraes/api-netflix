import { Application, json } from 'express'
import morgan from 'morgan'
import errorHandlerMiddleware from '../middlewares/error_handler.middleware'
import episodesRouter from './episode.router'
import listRouter from './list.router'
import showRouter from './show.router'
import userRouter from './user.router'

const routes = [
  showRouter,
  userRouter,
  episodesRouter,
  listRouter
]

function startRouter(app: Application) {
  const jsonParserMiddleware = json()

  app.use(jsonParserMiddleware)
  app.use(morgan('tiny'))
  app.use(errorHandlerMiddleware)
  app.use(routes)
}

export default startRouter
