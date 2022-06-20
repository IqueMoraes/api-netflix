import { Router } from 'express'
import passport from 'passport'
import { ShowController } from '../controllers'
import { ValidationMiddleware } from '../middlewares'
import { createShowSchema } from '../schemas'

const showRouter = Router()

showRouter.post('/shows', ValidationMiddleware(createShowSchema), passport.authenticate('jwt', { session: false }), ShowController.create)
showRouter.get('/shows', passport.authenticate('jwt', { session: false }), ShowController.list)
showRouter.get('/show/:id', passport.authenticate('jwt', { session: false }), ShowController.listOne)
showRouter.delete('/shows/:id', passport.authenticate('jwt', { session: false }), ShowController.delete)

export default showRouter
