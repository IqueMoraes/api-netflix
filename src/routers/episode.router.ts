import express from 'express'
import passport from 'passport'

import { EpisodeController } from '../controllers'
import validationMiddleware from '../middlewares/validation.middleware'
import { createEpisodeSchema } from '../schemas'

const episodesRouter = express.Router()

episodesRouter.post(
  '/episodes',
  passport.authenticate('jwt', { session: false }),
  validationMiddleware(createEpisodeSchema),
  EpisodeController.create
)

episodesRouter.get('/episodes/:showId', passport.authenticate('jwt', { session: false }),
EpisodeController.list)

episodesRouter.delete('/episodes/:episodeId', passport.authenticate('jwt', { session: false }),
EpisodeController.delete)

export default episodesRouter
