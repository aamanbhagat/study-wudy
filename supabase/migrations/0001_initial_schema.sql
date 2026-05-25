-- Master Study App — initial schema
-- 10 tables with RLS for a single-student personal app

-- Helper: enable UUID generation
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- updated_at trigger helper
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 1. fields  ────────────────────────────────────────────────
create table if not exists fields (
  id           uuid primary key default uuid_generate_v4(),
  key          text not null unique check (key in ('math', 'cs', 'physics')),
  name         text not null,
  description  text,
  position     int  not null default 0,
  created_at   timestamptz not null default now()
);

-- 2. phases  ────────────────────────────────────────────────
create table if not exists phases (
  id           uuid primary key default uuid_generate_v4(),
  field_id     uuid not null references fields(id) on delete cascade,
  number       int  not null,
  title        text not null,
  subtitle     text,
  est_duration text,
  position     int  not null default 0,
  unique (field_id, number)
);

-- 3. topics  ────────────────────────────────────────────────
create table if not exists topics (
  id           uuid primary key default uuid_generate_v4(),
  phase_id     uuid not null references phases(id) on delete cascade,
  field_id     uuid not null references fields(id) on delete cascade,
  number       text not null,
  title        text not null,
  description  text,
  position     int  not null default 0,
  unique (phase_id, number)
);

-- 4. subtopics  ─────────────────────────────────────────────
create table if not exists subtopics (
  id           uuid primary key default uuid_generate_v4(),
  topic_id     uuid not null references topics(id) on delete cascade,
  title        text not null,
  body         text,
  position     int  not null default 0
);

-- 5. topic_progress  ────────────────────────────────────────
create table if not exists topic_progress (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  topic_id            uuid not null references topics(id) on delete cascade,
  knowledge_level     int  not null default 0 check (knowledge_level between 0 and 5),
  confidence          numeric(3,2) not null default 0.0 check (confidence between 0 and 1),
  last_studied_at     timestamptz,
  total_study_minutes int  not null default 0,
  notes               text,
  updated_at          timestamptz not null default now(),
  unique (user_id, topic_id)
);
create trigger topic_progress_updated_at before update on topic_progress
  for each row execute function set_updated_at();

-- 6. subtopic_progress  ─────────────────────────────────────
create table if not exists subtopic_progress (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  subtopic_id       uuid not null references subtopics(id) on delete cascade,
  knowledge_level   int  not null default 0 check (knowledge_level between 0 and 5),
  confidence        numeric(3,2) not null default 0.0 check (confidence between 0 and 1),
  last_studied_at   timestamptz,
  updated_at        timestamptz not null default now(),
  unique (user_id, subtopic_id)
);
create trigger subtopic_progress_updated_at before update on subtopic_progress
  for each row execute function set_updated_at();

-- 7. study_sessions  ────────────────────────────────────────
create table if not exists study_sessions (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  topic_id          uuid references topics(id) on delete set null,
  subtopic_id       uuid references subtopics(id) on delete set null,
  started_at        timestamptz not null default now(),
  ended_at          timestamptz,
  duration_minutes  int,
  xp_earned         int  not null default 0,
  notes             text
);
create index if not exists study_sessions_user_started_at on study_sessions(user_id, started_at desc);

-- 8. daily_plans  ───────────────────────────────────────────
create table if not exists daily_plans (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid not null references auth.users(id) on delete cascade,
  plan_date             date not null,
  plan_json             jsonb not null default '{}'::jsonb,
  ai_insight            text,
  total_minutes_target  int  not null default 240,
  completed             boolean not null default false,
  unique (user_id, plan_date)
);

-- 9. review_cards (SM-2)  ───────────────────────────────────
create table if not exists review_cards (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  topic_id          uuid references topics(id) on delete set null,
  subtopic_id       uuid references subtopics(id) on delete set null,
  front             text not null,
  back              text not null,
  ease_factor       numeric(4,2) not null default 2.50,
  interval_days     int  not null default 0,
  repetitions       int  not null default 0,
  due_at            timestamptz not null default now(),
  last_reviewed_at  timestamptz
);
create index if not exists review_cards_user_due_at on review_cards(user_id, due_at);

-- 10. tests  ────────────────────────────────────────────────
create table if not exists tests (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  title             text not null,
  field             text check (field in ('math', 'cs', 'physics')),
  topic_id          uuid references topics(id) on delete set null,
  questions_json    jsonb not null default '[]'::jsonb,
  total_questions   int  not null default 0,
  duration_minutes  int  not null default 30,
  status            text not null default 'draft' check (status in ('draft', 'in_progress', 'completed')),
  score             numeric(5,2),
  started_at        timestamptz,
  completed_at      timestamptz,
  created_at        timestamptz not null default now()
);

-- Bonus: xp_ledger and streaks (gamification)
create table if not exists xp_ledger (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  amount      int not null,
  reason      text not null,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists xp_ledger_user_created_at on xp_ledger(user_id, created_at desc);

create table if not exists streaks (
  id                 uuid primary key default uuid_generate_v4(),
  user_id            uuid not null references auth.users(id) on delete cascade unique,
  current_days       int not null default 0,
  longest_days       int not null default 0,
  last_active_date   date not null default current_date,
  freezes_remaining  int not null default 0,
  updated_at         timestamptz not null default now()
);
create trigger streaks_updated_at before update on streaks
  for each row execute function set_updated_at();

-- Row Level Security
alter table fields            enable row level security;
alter table phases            enable row level security;
alter table topics            enable row level security;
alter table subtopics         enable row level security;
alter table topic_progress    enable row level security;
alter table subtopic_progress enable row level security;
alter table study_sessions    enable row level security;
alter table daily_plans       enable row level security;
alter table review_cards      enable row level security;
alter table tests             enable row level security;
alter table xp_ledger         enable row level security;
alter table streaks           enable row level security;

-- Curriculum is public-read (single-student app, but keep policies clean)
create policy "fields read"   on fields    for select using (true);
create policy "phases read"   on phases    for select using (true);
create policy "topics read"   on topics    for select using (true);
create policy "subtopics read" on subtopics for select using (true);

-- User-owned data
create policy "topic_progress own"     on topic_progress     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "subtopic_progress own"  on subtopic_progress  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "study_sessions own"     on study_sessions     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "daily_plans own"        on daily_plans        for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "review_cards own"       on review_cards       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tests own"              on tests              for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "xp_ledger own"          on xp_ledger          for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "streaks own"            on streaks            for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
