import {MigrationInterface, QueryRunner} from 'typeorm';

export class initialMigrations1620573465995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create extension if not exists pgcrypto;

        create table members (
          id uuid primary key default gen_random_uuid(),
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now(),
          first_name text not null,
          last_name text not null,
          email text not null unique,
          -- should possibly make not null, but for
          meta jsonb null constraint members_meta_type check (jsonb_typeof(meta) = 'object')
        );

        create index ix_members_first_name on members (first_name);
        create index ix_members_created_at on members (created_at);
        create index ix_members_updated_at on members (updated_at);
        create index ix_members_last_name on members (last_name);
        create index ix_members_email on members (email);
        create index ix_members_meta on members using gin (meta jsonb_path_ops);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table members;`);
  }
}
