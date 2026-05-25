-- AI conversations and messages
create table if not exists ai_conversations (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  topic_id    uuid references topics(id) on delete set null,
  mode        text not null default 'explain' check (mode in ('explain','debug','quiz','feynman','plan')),
  title       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger ai_conversations_updated_at before update on ai_conversations
  for each row execute function set_updated_at();
create index if not exists ai_conversations_user_updated_at on ai_conversations(user_id, updated_at desc);

create table if not exists ai_messages (
  id               uuid primary key default uuid_generate_v4(),
  conversation_id  uuid not null references ai_conversations(id) on delete cascade,
  role             text not null check (role in ('user','assistant','system')),
  content          text not null,
  attachments      jsonb not null default '[]'::jsonb,
  created_at       timestamptz not null default now()
);
create index if not exists ai_messages_conversation_created_at on ai_messages(conversation_id, created_at);

-- Recall checks during a study session
create table if not exists session_recalls (
  id                uuid primary key default uuid_generate_v4(),
  session_id        uuid not null references study_sessions(id) on delete cascade,
  user_id           uuid not null references auth.users(id) on delete cascade,
  asked_at          timestamptz not null default now(),
  prompt            text not null,
  response          text not null,
  score             int  not null check (score between 0 and 5),
  feedback          text,
  ai_metadata       jsonb not null default '{}'::jsonb
);
create index if not exists session_recalls_session on session_recalls(session_id, asked_at);

alter table ai_conversations enable row level security;
alter table ai_messages       enable row level security;
alter table session_recalls   enable row level security;

create policy "ai_conversations own" on ai_conversations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "ai_messages own" on ai_messages
  for all using (
    exists (select 1 from ai_conversations c where c.id = conversation_id and c.user_id = auth.uid())
  ) with check (
    exists (select 1 from ai_conversations c where c.id = conversation_id and c.user_id = auth.uid())
  );

create policy "session_recalls own" on session_recalls
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
