import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {CoopEvent} from '@bikecoop/common';

@Entity({name: 'coop_events'})
export class CoopEventEntity<T extends CoopEvent> implements CoopEvent {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({type: 'bigint', name: 'sequence_id', generated: true})
  sequenceId!: number;

  @Column({type: 'text', name: 'type'})
  type!: T['type'];

  @Column({type: 'text', name: 'scope_type'})
  scopeType!: T['scopeType'];

  @Column({type: 'uuid', name: 'scope_id'})
  scopeId!: string;

  @Column({type: 'timestamptz', name: 'happened_at'})
  happenedAt!: Date;

  @Column({type: 'timestamptz', name: 'inserted_at'})
  insertedAt!: Date;

  @Column({type: 'jsonb', name: 'data'})
  data!: T['data'];
}
