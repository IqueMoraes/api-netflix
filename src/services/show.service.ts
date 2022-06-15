import { Repository } from 'typeorm'
import { AppDataSource } from '../../configs/database/data-source'
import { ShowEntity } from '../entities'

interface CreateShowDTO {
  title: string
}

class ShowService {
  private showRepository: Repository<ShowEntity>

  constructor() {
    this.showRepository = AppDataSource.getRepository(ShowEntity)
  }

  /**
   * Retorna todos os filmes
   *
   * @returns Lista de todos os filmes
   *
   * */
  list() {
    return this.showRepository.find()
  }

  /**
   * Insere um novo filme no banco de dados
   *
   * @returns O filme inserido
   */
  async create(show: CreateShowDTO) {
    const showEntity = await this.showRepository.create(show)
    return await this.showRepository.save(showEntity)
  }
}

export default ShowService
