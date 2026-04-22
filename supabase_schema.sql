-- Create a profiles table that links to Supabase Auth
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  tier text default 'BASIC',
  weight float8 default 0,
  body_fat float8 default 0,
  consistency float8 default 0,
  readiness float8 default 0,
  energy text default 'MEDIUM',
  sleep text default '0H 0M',
  steps integer default 0,
  weight_goal float8 default 0,
  ai_insight text,
  weight_history jsonb default '[]'::jsonb,
  metrics jsonb default '{"steps": {"current": 0, "target": 10000}, "hydration": {"current": 0, "target": 3.0, "unit": "L"}, "calories": {"current": 0, "target": 2000}, "workout": {"current": 0, "target": 60, "unit": "m"}}'::jsonb,
  today_mission jsonb default '{"title": "Welcome Protocol", "focus": "Alignment", "duration": "15 Minutes", "imageUrl": ""}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Users can view their own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Users can insert their own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

-- Function to handle new user signups
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, name, tier)
  values (new.id, new.raw_user_meta_data->>'full_name', 'BASIC');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on any new user in auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
