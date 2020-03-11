import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import User from '~/model/User'
import Vote from '~/model/Vote'

@Entity()
class News {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  domain!: string

  @Column()
  url!: string

  @ManyToOne(
    () => User,
    user => user.news,
  )
  user!: User

  @OneToMany(
    () => Vote,
    vote => vote.news,
  )
  votes!: Vote[]

  @Column()
  userId!: number

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string
}

export default News
