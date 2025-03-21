import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100
  })
  name!: string;

  @Column('text')
  description!: string;

  @Column({
    nullable: true
  })
  cost?: number;

  @Column({
    nullable: true
  })
  parentId?: number;

  @Column({
    default: false
  })
  completed!: boolean;
}
