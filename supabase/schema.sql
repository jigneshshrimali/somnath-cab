-- Somnath Cab — bookings table
-- Run this once in your Supabase project's SQL Editor (Dashboard → SQL Editor → New Query),
-- then click "Run". See README.md "Setting up Supabase" for the full walkthrough.

create table if not exists bookings (
  id uuid primary key,
  booking_ref text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  data jsonb not null
);

-- Speeds up "list all bookings, newest first" (used by the admin dashboard)
create index if not exists bookings_created_at_idx on bookings (created_at desc);

-- Row Level Security: locked down by default. The app only ever talks to
-- this table using the SERVICE ROLE key from server-side code (never the
-- public anon key), which bypasses RLS entirely — so enabling RLS here with
-- no public policies is the safest default: nobody can read/write this table
-- directly from a browser, only your own API routes can.
alter table bookings enable row level security;
