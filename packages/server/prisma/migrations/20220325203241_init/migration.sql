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

create table members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  meta jsonb null constraint members_meta_type check (jsonb_typeof(meta) = 'object')
);

create table membership_types (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  level text not null
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members,
  membership_type_id uuid not null references membership_types,
  start_date timestamptz not null,
  end_date timestamptz not null,
  status text not null
);

create index ix_members_first_name on members (first_name);
create index ix_members_created_at on members (created_at);
create index ix_members_updated_at on members (updated_at);
create index ix_members_last_name on members (last_name);
create index ix_members_email on members (email);
create index ix_members_meta on members using gin (meta jsonb_path_ops);

create index ix_membership_types_name on membership_types (name);
create index ix_membership_types_level on membership_types (level);

create index ix_memberships_member_id on memberships (member_id);
create index ix_memberships_membership_type_id on memberships (membership_type_id);
create index ix_memberships_start_date on memberships (start_date);
create index ix_memberships_end_date on memberships (end_date);
create index ix_memberships_status on memberships (status);

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
