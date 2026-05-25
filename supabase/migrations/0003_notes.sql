-- Notes table
create table if not exists user_notes (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  topic_id    uuid references topics(id) on delete set null,
  title       text not null default 'Untitled note',
  body        text not null default '',
  pinned      boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger user_notes_updated_at before update on user_notes
  for each row execute function set_updated_at();
create index if not exists user_notes_user_updated_at on user_notes(user_id, updated_at desc);

alter table user_notes enable row level security;
create policy "user_notes own" on user_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
