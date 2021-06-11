import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ShiftTerm} from '../../../common/src';
import {differenceInDays} from 'date-fns';

@Entity({name: 'shift_terms'})
export class ShiftTermEntity implements ShiftTerm {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({type: 'text', name: 'name'})
  name!: string;

  @Column({type: 'timestamptz', name: 'start_date'})
  startDate!: Date;

  @Column({type: 'timestamptz', name: 'end_date'})
  endDate!: Date;

  @Column({type: 'text', name: 'repeat_pattern'})
  pattern!: string;

  get lengthInDays() {
    return differenceInDays(this.startDate, this.endDate);
  }
}
