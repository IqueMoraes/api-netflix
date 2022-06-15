import { Router } from 'express'
import { ShowController } from '../controllers'
import validationShowMiddleware from '../middlewares/validation.middleware'

const showRouter = Router()

showRouter.get('/shows', ShowController.list)
showRouter.post('/shows', validationShowMiddleware, ShowController.create)

export default showRouter
