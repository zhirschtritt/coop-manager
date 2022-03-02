-- group together series of shifts
create table shift_terms (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  start_date timestamptz not null,
  end_date timestamptz not null
);

create table shifts (
  id uuid primary key default gen_random_uuid(),
  start_at timestamptz not null,
  end_at timestamptz not null,
  shift_term_id uuid references shift_terms,
  slots jsonb not null default '{}'::jsonb constraint term_slots_constraint check (jsonb_typeof(slots) = 'object')
);

create table shift_assignments (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members,
  shift_id uuid not null references shifts,
  created_by uuid not null references coop_events,
  slot text not null
);

create index ix_shift_terms_name on shift_terms (name);
create index ix_shift_terms_start_date on shift_terms (start_date);
create index ix_shift_terms_end_date on shift_terms (end_date);

create index ix_shifts_start_at on shifts (start_at);
create index ix_shifts_end_at on shifts (end_at);
create index ix_shifts_shift_term_id on shifts (shift_term_id);
create index ix_shifts_slots on shifts using gin (slots jsonb_path_ops);

create index ix_shift_assignments_member_id on shift_assignments (member_id);
create index ix_shift_assignments_shift_id on shift_assignments (shift_id);
create index ix_shift_assignments_created_by on shift_assignments (created_by);
create index ix_shift_assignments_slot on shift_assignments (slot);
