import {MemberLevel, MembershipType} from '@bikecoop/common';
import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {MemberEntity} from '../members/member.entity';
import {MembershipEntity} from './membership.entity';

@ObjectType()
@Entity({name: 'membership_types'})
export class MembershipTypeEntity implements MembershipType {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Field(() => GraphQLISODateTime)
  @Column({name: 'created_at', type: 'timestamptz'})
  createdAt!: Date;

  @Field(() => String)
  @Column({name: 'name'})
  name!: string;

  @Field(() => String)
  @Column({name: 'level'})
  level!: MemberLevel;

  @Field(() => [MemberEntity])
  @ManyToMany(() => MemberEntity, (member) => member.membershipTypes)
  members?: MemberEntity[];

  @Field(() => [MembershipEntity])
  @OneToMany(() => MembershipEntity, (membership) => membership.memberShipType)
  memberships?: MembershipEntity[];
}
