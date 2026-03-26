create table if not exists excuses (
  id uuid primary key default gen_random_uuid(),
  input text,
  response text,
  mode text,
  created_at timestamp with time zone default now()
);
