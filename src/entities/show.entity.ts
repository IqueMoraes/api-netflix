import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ShowCategory } from '../enums'

@Entity('shows')
class Show {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 200 })
  cover: string

  @Column({ length: 45 })
  title: string

  @Column({ length: 100 })
  director: string

  @Column({ length: 200 })
  actors: string

  @Column({ type: 'longtext' })
  description: string

  @Column({ type: 'enum', default: ShowCategory.MOVIE, enum: ShowCategory })
  Category: string
}

export default Show
