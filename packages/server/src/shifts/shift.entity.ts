import {Field, GraphQLISODateTime, ObjectType} from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Shift} from '../../../common/src';
import {MemberEntity} from '../members/member.entity';
import {ShiftAssignmentEntity} from './shift-assignment.entity';

@ObjectType()
@Entity({name: 'shifts'})
export class ShiftEntity implements Shift {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Field(() => GraphQLISODateTime)
  @Column({type: 'timestamptz', name: 'starts_at'})
  startsAt!: Date;

  @Field(() => GraphQLISODateTime)
  @Column({type: 'timestamptz', name: 'ends_at'})
  endsAt!: Date;

  @Field(() => String)
  @Column({type: 'uuid', name: 'shift_term_id'})
  shiftTermId!: string;

  @Field(() => [MemberEntity])
  @ManyToMany(() => MemberEntity, (member) => member.shifts)
  @JoinTable({
    name: 'shift_assignments',
    joinColumn: {
      name: 'shift_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'member_id',
      referencedColumnName: 'id',
    },
  })
  members?: MemberEntity[];

  @OneToMany(
    () => ShiftAssignmentEntity,
    (shiftAssignment) => shiftAssignment.shift,
  )
  shiftAssignments?: ShiftAssignmentEntity[];
}
