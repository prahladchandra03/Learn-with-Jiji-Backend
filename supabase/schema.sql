-- PROFILES TABLE
create table profiles (
  id uuid primary key references auth.users(id),
  name text,
  email text,
  created_at timestamp default now()
);

-- QUERIES TABLE
create table queries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  query_text text not null,
  created_at timestamp default now()
);

-- RESOURCES TABLE
create table resources (
  id uuid default gen_random_uuid() primary key,
  title text,
  type text check (type in ('ppt', 'video')),
  topic text,
  file_url text,
  created_at timestamp default now()
);

-- ================================
-- ROW LEVEL SECURITY
-- ================================

alter table queries enable row level security;

create policy "Users can read their own queries"
on queries
for select
using (auth.uid() = user_id);

create policy "Users can insert their own queries"
on queries
for insert
with check (auth.uid() = user_id);
