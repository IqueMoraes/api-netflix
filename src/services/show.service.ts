import { Repository } from 'typeorm'
import { AppDataSource } from '../../configs/database/data-source'
import { ShowEntity } from '../entities'
import NotFoundException from '../exceptions/not_found.exception'

interface CreateShowDTO {
  title: string
}

class ShowService {
  private showRepository: Repository<ShowEntity>

  constructor() {
    this.showRepository = AppDataSource.getRepository(ShowEntity)
  }

  /**
   * Retorna todos os shows
   *
   * @returns Lista de todos os shows
   *
   * */
  list() {
    return this.showRepository.find()
  }

  /**
   * Retorna o show baseado no id
   *
   * @params um id em formato número
   *
   * @returns Um show
   *
   * */
   listOne(id: number) {
    return this.showRepository.findOne({ where: { id } })
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

  /**
   * Deleta o show identificado pelo id
   *
   * @returns o show deletado
   *
   * @params um id em formato número
   */
   async delete(id: number) {
    const show = await this.showRepository.delete(id);

    if (show.affected) {
      return show;
    }

    throw new NotFoundException(`O show id: ${id} não foi encontrado`);
  }
}

export default ShowService
