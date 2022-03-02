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
