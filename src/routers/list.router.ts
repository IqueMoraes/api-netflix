import express from 'express'
import passport from 'passport'
import { ListController } from '../controllers'
import { IdentifyUser } from '../middlewares/'

const listRouter = express.Router()

listRouter.get('/list', passport.authenticate('jwt', { session: false }), IdentifyUser, ListController.list)

listRouter.post('/list', passport.authenticate('jwt', { session: false }), IdentifyUser, ListController.add)

listRouter.delete('/list/:showId', passport.authenticate('jwt', { session: false }), IdentifyUser, ListController.remove)

export default listRouter
