import {Member} from '@bikecoop/common';
import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {MembershipTypeEntity, MembershipEntity} from '../memberships';
import {ShiftEntity} from '../shifts/shift.entity';

@ObjectType()
@Entity({name: 'members'})
export class MemberEntity implements Member {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Field(() => String)
  @Column({name: 'email'})
  email!: string;

  @Field(() => String)
  @Column({name: 'first_name'})
  firstName!: string;

  @Field(() => String)
  @Column({name: 'last_name'})
  lastName!: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt!: Date;

  /** Not in use yet, could contain other denormalized member information in the future */
  @Field(() => GraphQLJSON)
  @Column({name: 'meta', type: 'jsonb'})
  meta!: Record<string, unknown>;

  @Field(() => [MembershipTypeEntity])
  @ManyToMany(
    () => MembershipTypeEntity,
    (membershipType) => membershipType.members,
    )
    @JoinTable({
    name: 'memberships',
    joinColumn: {
      name: 'member_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'membership_type_id',
      referencedColumnName: 'id',
    },
  })
  membershipTypes?: MembershipTypeEntity[];

  @Field(() => [MembershipEntity])
  @OneToMany(() => MembershipEntity, (membership) => membership.member)
  memberships?: MembershipEntity[];

  @Field(() => [ShiftEntity])
  @ManyToMany(() => ShiftEntity, (shift) => shift.members)
  @JoinTable({
    name: 'shift_assignments',
    joinColumn: {
      name: 'member_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'shift_id',
      referencedColumnName: 'id',
    },
  })
  shifts?: ShiftEntity[];
}
