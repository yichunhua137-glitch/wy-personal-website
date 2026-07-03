# Supabase Setup

Create these two tables in Supabase SQL Editor:

```sql
create table if not exists public.site_visitors (
  visitor_id text primary key,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  visit_count integer not null default 0
);

create table if not exists public.site_events (
  id bigint generated always as identity primary key,
  visitor_id text not null references public.site_visitors(visitor_id) on delete cascade,
  event_type text not null check (event_type in ('resume_open', 'resume_download')),
  page_path text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists site_events_event_type_idx on public.site_events(event_type);
create index if not exists site_events_created_at_idx on public.site_events(created_at desc);
```

Set these EdgeOne environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PAGE_PASSWORD`
- `ADMIN_SESSION_SECRET`

If you do not want to store the plain admin password in EdgeOne, use `ADMIN_PAGE_PASSWORD_HASH` instead of `ADMIN_PAGE_PASSWORD`.
