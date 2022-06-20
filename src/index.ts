import 'reflect-metadata'
import express from 'express'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import { databaseInitialize } from '../configs/database/data-source'
import startRouter from './routers'

const app: express.Application = express()

const PORT = 3000
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}

const strategy = new JwtStrategy(opts, function(payload, done) {
  console.log(payload)
  return done(null, {});
})

passport.use(strategy);

databaseInitialize()
startRouter(app)

app.listen(PORT, () => {
  console.log(`Example app listen on port ${PORT}`)
})
