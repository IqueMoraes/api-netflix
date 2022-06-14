import 'reflect-metadata'
import express from 'express'
import { databaseInitialize } from '../configs/database/data-source'
import startRouter from './routers'

databaseInitialize()

const app: express.Application = express()

const PORT = 3000

startRouter(app)

app.listen(PORT, () => {
  console.log(`Example app listen on port ${PORT}`)
})
