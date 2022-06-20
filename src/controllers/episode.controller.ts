import { Request } from 'express'
import HTTP_STATUS from '../enums/http.enum'
import { CustomResponse } from '../interfaces/custom_response.interface'
import EpisodeService from '../services/episode.service'

const episodeService = new EpisodeService()

class EpisodeController {
  public static async create(req: Request, res: CustomResponse) {
    try {
      const createdEpisode = await episodeService.create(req.body)

      res
        .status(HTTP_STATUS.CREATED)
        .json(createdEpisode)
    } catch (e) {
      res.errorHandler && res.errorHandler(e)
    }
  }

  public static async list(req: Request, res: CustomResponse) {
    try {
      const { showId } = req.params
      const listEpisodes = await episodeService.list(parseInt(showId))

      res.status(HTTP_STATUS.OK).json(listEpisodes)
    } catch (e) {
      res.errorHandler && res.errorHandler(e)
    }
  }

  public static async delete(req: Request, res: CustomResponse) {
    try {
      const { episodeId } = req.params
      await episodeService.delete(parseInt(episodeId))

      res.status(HTTP_STATUS.NO_CONTENT).json()
    } catch (e) {
      res.errorHandler && res.errorHandler(e)
    }
  }
}

export default EpisodeController
