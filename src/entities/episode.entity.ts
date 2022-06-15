import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('episodes')
class Episode {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 45 })
  title: string

  @Column({ length: 45 })
  description: string

  @Column({ length: 45 })
  cover: string

  @Column({ length: 45 })
  duration: string

  @Column({ length: 45 })
  actors: string
}

export default Episode
