import {MigrationInterface, QueryRunner} from 'typeorm';

export class addMembershipsTable1620658230722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      create table membership_types (
        id uuid primary key default gen_random_uuid(),
        created_at timestamptz not null default now(),
        name text not null,
        level text not null
      );

      create index ix_membership_types_name on membership_types (name);
      create index ix_membership_types_level on membership_types (level);

      create table memberships (
        id uuid primary key default gen_random_uuid(),
        member_id uuid not null references members,
        membership_type_id uuid not null references membership_types,
        start_date timestamptz not null,
        end_date timestamptz not null,
        status text not null
      );

      create index ix_memberships_member_id on memberships (member_id);
      create index ix_memberships_membership_type_id on memberships (membership_type_id);
      create index ix_memberships_start_date on memberships (start_date);
      create index ix_memberships_end_date on memberships (end_date);
      create index ix_memberships_status on memberships (status);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      drop table membership_types;
      drop table memberships;
    `);
  }
}
