import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import News from '~/model/News'
import User from '~/model/User'

@Entity()
class Vote {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  userId!: number

  @Column()
  newsId!: number

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => News)
  news!: News

  @CreateDateColumn()
  createdAt!: string
}

export default Vote
