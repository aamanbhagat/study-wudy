-- Cross-device sync tables for user-generated study data.
-- Each table stores the localStorage payload as JSONB so the client can
-- evolve the shape without breaking schema. updated_at is the merge key.

create table if not exists user_study_sessions (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  payload     jsonb not null,
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);
create index if not exists user_study_sessions_user_updated on user_study_sessions(user_id, updated_at desc);

create table if not exists user_studied_subtopics (
  subtopic_id text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  payload     jsonb not null,
  updated_at  timestamptz not null default now(),
  primary key (user_id, subtopic_id)
);
create index if not exists user_studied_subtopics_user_updated on user_studied_subtopics(user_id, updated_at desc);

create table if not exists user_card_progress (
  card_id     text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  payload     jsonb not null,
  updated_at  timestamptz not null default now(),
  primary key (user_id, card_id)
);
create index if not exists user_card_progress_user_updated on user_card_progress(user_id, updated_at desc);

create table if not exists user_test_results (
  id          text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  payload     jsonb not null,
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);
create index if not exists user_test_results_user_updated on user_test_results(user_id, updated_at desc);

-- updated_at triggers
create trigger user_study_sessions_updated_at before update on user_study_sessions
  for each row execute function set_updated_at();
create trigger user_studied_subtopics_updated_at before update on user_studied_subtopics
  for each row execute function set_updated_at();
create trigger user_card_progress_updated_at before update on user_card_progress
  for each row execute function set_updated_at();
create trigger user_test_results_updated_at before update on user_test_results
  for each row execute function set_updated_at();

-- RLS
alter table user_study_sessions    enable row level security;
alter table user_studied_subtopics enable row level security;
alter table user_card_progress     enable row level security;
alter table user_test_results      enable row level security;

create policy "user_study_sessions own"    on user_study_sessions    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_studied_subtopics own" on user_studied_subtopics for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_card_progress own"     on user_card_progress     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_test_results own"      on user_test_results      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
