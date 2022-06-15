import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shows')
class Show {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 200 })
  cover: string

  @Column({ length: 45 })
  title: string

  @Column({ length: 45 })
  director: string

  @Column({ length: 45 })
  actors: string

  @Column({ length: 45 })
  description: string

  @Column({ length: 45 })
  Category: string
}

export default Show
