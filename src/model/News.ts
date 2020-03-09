import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
class News {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  source!: string

  @Column()
  url!: string

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string
}

export default News
