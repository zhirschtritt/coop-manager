import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Shift} from '../../../common/src';

@Entity({name: 'shifts'})
export class ShiftEntity implements Shift {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({type: 'timestamptz', name: 'starts_at'})
  startsAt!: Date;

  @Column({type: 'timestamptz', name: 'ends_at'})
  endsAt!: Date;

  @Column({type: 'uuid', name: 'shift_term_id'})
  shiftTermId!: string;
}
