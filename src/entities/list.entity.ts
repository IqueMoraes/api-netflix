import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('episodes')
class List {
  @PrimaryGeneratedColumn()
  id: number
}

export default List
