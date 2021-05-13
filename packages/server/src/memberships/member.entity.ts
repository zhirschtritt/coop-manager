import {Member} from '@bikecoop/common';
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
import {MembershipTypeEntity} from './membership-type.entity';
import {MembershipEntity} from './membership.entity';

@Entity({name: 'members'})
export class MemberEntity implements Member {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({name: 'email'})
  email!: string;

  @Column({name: 'first_name'})
  firstName!: string;

  @Column({name: 'last_name'})
  lastName!: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt!: Date;

  /** Not in use yet, could contain other denormalized member information in the future */
  @Column({name: 'meta', type: 'jsonb'})
  meta!: Record<string, unknown>;

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
  memberShipTypes?: MembershipTypeEntity[];

  @OneToMany(() => MembershipEntity, (membership) => membership.members, {
    lazy: true,
  })
  memberships?: MembershipEntity[];
}
