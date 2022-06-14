import { Request, Response } from 'express'
import { MovieServices } from '../services'

class MovieController {
  public static async list(req: Request, res: Response) {
    const movieService = new MovieServices()
    const movies = await movieService.list()

    res.send(movies)
  }
}

export default MovieController
