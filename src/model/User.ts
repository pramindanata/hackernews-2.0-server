import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import News from '~/model/News'
import Vote from '~/model/Vote'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  username!: string

  @Column({ unique: true })
  email!: string

  @Column({ select: false })
  password!: string

  @Column()
  photo!: string

  @OneToMany(
    () => News,
    news => news.user,
  )
  news!: News[]

  @OneToMany(
    () => Vote,
    vote => vote.user,
  )
  votes!: Vote[]

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string

  newsCount!: number
}

export default User
