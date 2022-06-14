import { Repository } from 'typeorm'
import { AppDataSource } from '../../configs/database/data-source'
import { MoviesEntity } from '../entities'

class MovieService {
  private movieRepository: Repository<MoviesEntity>

  constructor() {
    this.movieRepository = AppDataSource.getRepository(MoviesEntity)
  }

  /**
   * Retorna todos os filmes
   *
   * @returns Lista de todos os filmes
   *
   * */
  list() {
    return this.movieRepository.find()
  }
}

export default MovieService
