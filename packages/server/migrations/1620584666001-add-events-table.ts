import {MigrationInterface, QueryRunner} from 'typeorm';

export class addEventsTable1620584666001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create extension if not exists pgcrypto;

        create table coop_events (
          id uuid primary key default gen_random_uuid(),
          sequence_id bigserial not null unique,
          type text not null,
          scope_type text not null,
          scope_id text not null,
          happened_at timestamptz not null,
          inserted_at timestamptz not null default now(),
          data jsonb not null
        );

        create index ix_coop_event_scope_type on coop_events (scope_type, scope_id);
        create index ix_coop_event_happened_at on coop_events (scope_type, scope_id, happened_at);
        create index ix_coop_event_sequence_id on coop_events (scope_type, scope_id, sequence_id);
        create index ix_coop_event_data on coop_events using gin (data jsonb_path_ops);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table coop_events`);
  }
}
