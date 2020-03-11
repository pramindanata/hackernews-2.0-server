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

  /**
   * https://github.com/typeorm/typeorm/issues/1822. Must wait for addSelectAndMap()
   * to remove this prop from table.
   */
  // @Column({ select: false, nullable: true })
  voteCount!: number

  // helper prop for loadRelationCountAndMap (can't get boolean, so i use number as alternative)
  upvoted!: number
}

export default News
