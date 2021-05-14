import {MigrationInterface, QueryRunner} from 'typeorm';

export class addShiftsTables1620941729075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      create table shift_terms (
        id uuid primary key default gen_random_uuid(),
        name text not null unique,
        start_date timestamptz not null,
        end_date timestamptz not null,
        repeat_pattern text not null
      );

      create index ix_shift_terms_start_date on shift_terms (start_date);
      create index ix_shift_terms_end_date on shift_terms (end_date);
      create index ix_shift_terms_name on shift_terms (name);

      create table shifts (
        id uuid primary key default gen_random_uuid(),
        starts_at timestamptz not null,
        ends_at timestamptz not null,
        shift_term_id uuid not null references shift_terms
        );

      create index ix_shifts_starts_at on shifts (starts_at);
      create index ix_shifts_ends_at on shifts (ends_at);
      create index ix_shifts_shift_term_id on shifts (shift_term_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('drop table shifts;');
    queryRunner.query('drop table shift_terms;');
  }
}
