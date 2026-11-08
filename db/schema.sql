-- Run once against the Neon database (psql or the Neon SQL editor).

create table if not exists inquiries (
  id            bigserial primary key,
  first_name    text not null,
  last_name     text,
  email         text not null,
  phone         text,
  contact_pref  text,
  dates         text,
  guests        text,
  details       text,
  source        text default 'bvifreedom.com',
  created_at    timestamptz not null default now()
);

create table if not exists guest_photos (
  id            bigserial primary key,
  url           text not null,
  caption       text,
  guest_name    text,
  sailed_week   text,          -- free text, e.g. "March 2026"
  status        text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at    timestamptz not null default now(),
  reviewed_at   timestamptz
);

create index if not exists guest_photos_status_idx on guest_photos (status, created_at desc);
