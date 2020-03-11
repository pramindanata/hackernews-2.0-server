import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import News from '~/model/News'
import User from '~/model/User'

@Entity()
class Vote {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(
    () => User,
    user => user.votes,
  )
  user!: User

  @ManyToOne(
    () => News,
    news => news.votes,
  )
  news!: News

  @Column()
  userId!: number

  @Column()
  newsId!: number

  @CreateDateColumn()
  createdAt!: string
}

export default Vote
