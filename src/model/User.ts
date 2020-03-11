import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string
}

export default User
