import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEvent} from '@bikecoop/common';
import {Field, GraphQLISODateTime, ID, Int, ObjectType} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
@Entity({name: 'coop_events'})
export class CoopEventEntity implements BaseEvent {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Field(() => Int)
  @Column({type: 'bigint', name: 'sequence_id', generated: true})
  sequenceId!: number;

  @Field(() => String)
  @Column({type: 'text', name: 'type'})
  type!: string;

  @Field(() => String)
  @Column({type: 'text', name: 'scope_type'})
  scopeType!: string;

  @Field(() => ID)
  @Column({type: 'uuid', name: 'scope_id'})
  scopeId!: string;

  @Field(() => GraphQLISODateTime)
  @Column({type: 'timestamptz', name: 'happened_at'})
  happenedAt!: Date;

  @Field(() => GraphQLISODateTime)
  @Column({type: 'timestamptz', name: 'inserted_at', default: true})
  insertedAt!: Date;

  @Field(() => GraphQLJSON)
  @Column({type: 'jsonb', name: 'data'})
  data!: Record<string, any>;
}
