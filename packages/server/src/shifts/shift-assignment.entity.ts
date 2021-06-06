import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ShiftAssignment} from '@bikecoop/common';
import {MemberEntity} from '../members/member.entity';
import {ShiftEntity} from './shift.entity';

@Entity({name: 'shift_assignments'})
export class ShiftAssignmentEntity implements ShiftAssignment {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({type: 'uuid', name: 'member_id'})
  memberId!: string;

  @ManyToOne(() => MemberEntity, (member) => member.shifts)
  member!: MemberEntity;

  @Column({type: 'uuid', name: 'shift_id'})
  shiftId!: string;

  @ManyToOne(() => ShiftEntity, (shift) => shift.shiftAssignments)
  shift!: ShiftEntity;

  @Column({type: 'uuid', name: 'created_by'})
  createdBy!: string;

  @Column({type: 'jsonb', name: 'meta'})
  meta!: Record<string, any>;
}
