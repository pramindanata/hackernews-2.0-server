import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import User from '~/model/User'

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

  @Column()
  userId!: number

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string
}

export default News
