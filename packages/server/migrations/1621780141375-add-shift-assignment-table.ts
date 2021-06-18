import {MigrationInterface, QueryRunner} from 'typeorm';

export class addShiftAssignmentTable1621780141375
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        create table shift_assignments (
          id uuid primary key default gen_random_uuid(),
          member_id uuid not null references members,
          shift_id uuid not null references shifts
        );

        -- this compound index will also cover lookups by member_id only
        create unique index ix_shift_assignments_member_shift on shift_assignments (member_id, shift_id);
        create index ix_shift_assignments_shift_id on shift_assignments (shift_id);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
