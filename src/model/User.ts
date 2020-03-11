import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import News from '~/model/News'

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

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string
}

export default User
