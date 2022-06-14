import { Router } from 'express'
import { MovieController } from '../controllers'

const movieRouter = Router()

movieRouter.get('/movies', MovieController.list)

export default movieRouter
