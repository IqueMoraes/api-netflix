import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ShowEntity } from '.'

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100, unique: true })
  email: string

  @Column({ length: 100 })
  password: string

  @ManyToMany(() => ShowEntity, { eager: true })
  @JoinTable()
  list: ShowEntity[]
}

export default User
