create extension if not exists pgcrypto;

create table organizations (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

create index ix_organization_name on organizations (name);

create table coop_events (
  id uuid primary key default gen_random_uuid(),
  organization_id text not null references organizations,
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
  organization_id text not null references organizations,
  user_id text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null unique
);

create index ix_members_first_name on members (first_name);
create index ix_members_created_at on members (created_at);
create index ix_members_updated_at on members (updated_at);
create index ix_members_last_name on members (last_name);
create index ix_members_email on members (email);

create table membership_types (
  id uuid primary key default gen_random_uuid(),
  organization_id text not null references organizations,
  created_at timestamptz not null default now(),
  name text not null,
  data jsonb not null default '{}'::jsonb
);

create index ix_membership_types_name on membership_types (name);

-- join members <-> membership_types
create table memberships (
  primary key(member_id, organization_id, membership_type_id),
  member_id uuid not null references members,
  membership_type_id uuid not null references membership_types,
  organization_id text not null references organizations,
  -- the event that triggered the creation of this memebership
  created_by uuid not null references coop_events,
  start_date timestamptz not null,
  end_date timestamptz not null,
  status text not null
);

create index ix_memberships_member_id on memberships (member_id);
create index ix_memberships_membership_type_id on memberships (membership_type_id);
create index ix_memberships_start_date on memberships (start_date);
create index ix_memberships_end_date on memberships (end_date);
create index ix_memberships_status on memberships (status);


create table shift_terms (
  id uuid primary key default gen_random_uuid(),
  organization_id text not null references organizations,
  name text not null unique,
  start_date timestamptz not null,
  end_date timestamptz not null
);

create index ix_shift_terms_name on shift_terms (name);
create index ix_shift_terms_start_date on shift_terms (start_date);
create index ix_shift_terms_end_date on shift_terms (end_date);

create table shift_types (
  id uuid primary key default gen_random_uuid(),
  organization_id text not null references organizations,
  name text not null unique,
  roles text[] not null
);

create table shifts (
  id uuid primary key default gen_random_uuid(),
  organization_id text not null references organizations,
  start_at timestamptz not null,
  end_at timestamptz not null,
  notes text not null default '',
  shift_type_id uuid references shift_types not null,
  shift_term_id uuid references shift_terms
);

create index ix_shifts_start_at on shifts (start_at);
create index ix_shifts_end_at on shifts (end_at);
create index ix_shifts_shift_term_id on shifts (shift_term_id);
create index ix_shifts_shift_type_id on shifts (shift_type_id);

-- join member <-> shift
create table shift_assignments (
  primary key(member_id, shift_id, organization_id),
  organization_id text not null references organizations,
  member_id uuid not null references members,
  shift_id uuid not null references shifts,
  created_by uuid not null references coop_events
);

create index ix_shift_assignments_shift_id on shift_assignments (shift_id);
create index ix_shift_assignments_created_by on shift_assignments (created_by);

-- TODO: enable and use row-level security throughout application
-- alter table coop_events enable row level security;
-- create policy coop_events_isolation_policy on coop_events
--   using (organization_id = (nullif(current_setting('app.organization_id', true), '')::uuid));

-- alter table members enable row level security;
-- create policy members_isolation_policy on members
--   using (organization_id = (nullif(current_setting('app.organization_id', true), '')::uuid));

-- alter table membership_types enable row level security;
-- create policy membership_types_isolation_policy on membership_types
--   using (organization_id = (nullif(current_setting('app.organization_id', true), '')::uuid));

-- alter table memberships enable row level security;
-- create policy memberships_isolation_policy on memberships
--   using (organization_id = (nullif(current_setting('app.organization_id', true), '')::uuid));

-- alter table shift_terms enable row level security;
-- create policy shift_terms_isolation_policy on shift_terms
--   using (organization_id = (nullif(current_setting('app.organization_id', true), '')::uuid));

-- alter table shifts enable row level security;
-- create policy shifts_isolation_policy on shifts
--   using (organization_id = (nullif(current_setting('app.organization_id', true), '')::uuid));

-- alter table shift_assignments enable row level security;
-- create policy shift_assignments_isolation_policy on shift_assignments
--   using (organization_id = (nullif(current_setting('app.organization_id', true), '')::uuid));
