import { Request } from 'express'
import { ShowEntity } from '../entities'
import { CustomResponse } from '../interfaces/custom_response.interface'
import createShowSchema from '../schemas/show.schema'
import { ShowServices } from '../services'

const showService = new ShowServices()

class ShowController {
  public static async list(req: Request, res: CustomResponse) {
    const shows = await showService.list()

    res.status(200).json(shows)
  }

  public static async listOne(req: Request, res: CustomResponse) {
    try {
      const { params: { id } } = req

      const show = await showService.listOne(+id)

      res.status(200).json(show)
    } catch (e: any) {
        res.errorHandler && res.errorHandler(e)
      }
  }

  public static async delete(req: Request, res: CustomResponse) {
    try {
      const { params: { id } } = req
      const deletedShow = await showService.delete(+id)

      res.status(201).json(deletedShow)
    } catch (e: any) {
      res.errorHandler && res.errorHandler(e)
    }
  }

  public static async create(req: Request, res: CustomResponse) {
    try {
    const validated: Omit<ShowEntity, 'id'> = await createShowSchema.validateAsync(req.body)

    const result: ShowEntity = await showService.create(validated)

    res.status(201).json(result)
  } catch (e: any) {
    res.errorHandler && res.errorHandler(e)
  }
  }
}

export default ShowController
