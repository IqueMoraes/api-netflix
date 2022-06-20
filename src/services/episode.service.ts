import { Repository } from 'typeorm';
import winston from 'winston'
import { AppDataSource } from '../../configs/database/data-source'
import { EpisodeEntity, ShowEntity } from '../entities';
import BadRequest from '../exceptions/bad_request.exception'

type CreateEpisodeDTO = Omit<EpisodeEntity, 'id'> & { showId: number }

class EpisodeService {
  private episodeRespository: Repository<EpisodeEntity>;
  private showRepository: Repository<ShowEntity>;
  private logger: winston.Logger;

  constructor() {
    this.episodeRespository = AppDataSource.getRepository(EpisodeEntity);
    this.showRepository = AppDataSource.getRepository(ShowEntity);
  }

  async create(createEpisode: CreateEpisodeDTO) {
    const { showId } = createEpisode;
    const show = await this.showRepository.findOne({ where: { id: showId } })

    if (!show) {
      throw new BadRequest(`O show id: ${showId} não existe`)
    }

    const createdEpisode = await this.episodeRespository.save(createEpisode)

    show.episodes = [...show.episodes, createdEpisode]

    await this.showRepository.save(show)

    return createdEpisode
  }

  async list(showId: number) {
    const show = await this.showRepository.findOne({ where: { id: showId } })

    if (!show) {
      throw new BadRequest(`O show id: ${showId} não existe`)
    }

    return show.episodes
  }

  async delete(episodeId: number) {
    return await this.episodeRespository.delete(episodeId)
  }
}

export default EpisodeService
