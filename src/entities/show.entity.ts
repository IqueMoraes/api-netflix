import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EpisodeEntity } from '.'
import { ShowCategory } from '../enums'

@Entity('shows')
class Show {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 200 })
  cover: string

  @Column({ length: 45, unique: true })
  title: string

  @Column({ length: 100 })
  director: string

  @Column({ length: 200 })
  actors: string

  @Column({ type: 'longtext' })
  description: string

  @Column({ type: 'enum', default: ShowCategory.MOVIE, enum: ShowCategory })
  category: ShowCategory

  @OneToMany(() => EpisodeEntity, episode => episode.show, { eager: true })
  episodes: EpisodeEntity[]
}

export default Show
