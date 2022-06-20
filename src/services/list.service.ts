import { Repository } from 'typeorm'
import { AppDataSource } from '../../configs/database/data-source'
import { ShowEntity, UserEntity } from '../entities'
import BadRequest from '../exceptions/bad_request.exception'

class ListService {
  userRepository: Repository<UserEntity>;
  showRepository: Repository<ShowEntity>;

  constructor() {
    this.showRepository = AppDataSource.getRepository(ShowEntity)
    this.userRepository = AppDataSource.getRepository(UserEntity)
  }

  private isMovieInList(showId: number, user: UserEntity) {
    return user.list.filter((show) => show.id === showId).length > 0
  }

  async add(showId: number, user: UserEntity) {
    if (this.isMovieInList(showId, user)) {
      throw new BadRequest('Filme já adicionado')
    }

    const show = await this.showRepository.findOne({ where: { id: showId } })

    if (!show) {
      throw new BadRequest(`O Show id -> ${showId} não foi encontrado!`)
    }

    user.list = [...user.list, show];

    return this.userRepository.save(user)
  }

  remove(showId: number, user: UserEntity) {
    const newUserList = user.list.filter(show => show.id !== showId)

    return this.userRepository.save({
      ...user,
      list: newUserList
    })
  }
}

export default ListService
