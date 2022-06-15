import { Request, Response } from 'express'
import { ShowEntity } from '../entities'
import createShowSchema from '../schemas/show.schema'
import { ShowServices } from '../services'

class ShowController {
  public static async list(req: Request, res: Response) {
    const showService = new ShowServices()
    const shows = await showService.list()

    res.status(200).json(shows)
  }

  public static async create(req: Request, res: Response) {
    try {
    const validated: Omit<ShowEntity, 'id'> = await createShowSchema.validateAsync(req.body)

    const showService = new ShowServices()

    const result: ShowEntity = await showService.create(validated)

    res.status(201).json(result)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
  }
}

export default ShowController
