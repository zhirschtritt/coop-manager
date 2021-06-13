import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {ShiftAssignment} from '@bikecoop/common';
import {MemberEntity} from '../members/member.entity';
import {ShiftEntity} from './shift.entity';

@Entity({name: 'shift_assignments'})
export class ShiftAssignmentEntity implements ShiftAssignment {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({type: 'uuid', name: 'member_id'})
  memberId!: string;

  @Column({type: 'uuid', name: 'shift_id'})
  shiftId!: string;

  @Column({type: 'uuid', name: 'created_by'})
  createdBy!: string;

  @ManyToOne(() => MemberEntity, (member) => member.shifts)
  @JoinColumn({name: 'member_id'})
  member!: MemberEntity;

  @ManyToOne(() => ShiftEntity, (shift) => shift.shiftAssignments)
  @JoinColumn({name: 'shift_id'})
  shift!: ShiftEntity;
}
