create extension if not exists pgcrypto;

create table if not exists public.ticket_orders (
  id uuid primary key default gen_random_uuid(),
  external_reference text unique not null,
  preference_id text,
  payment_id text,
  event_slug text not null,
  event_name text not null,
  ticket_type text,
  quantity int not null default 1,
  unit_price numeric not null,
  total_amount numeric not null,
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null,
  payment_status text not null default 'created',
  payment_status_detail text,
  payment_method text,
  date_approved timestamptz,
  raw_payment jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists ticket_orders_external_reference_idx
  on public.ticket_orders (external_reference);

create index if not exists ticket_orders_payment_status_idx
  on public.ticket_orders (payment_status);

create index if not exists ticket_orders_buyer_email_idx
  on public.ticket_orders (buyer_email);

create index if not exists ticket_orders_event_slug_idx
  on public.ticket_orders (event_slug);

create or replace function public.set_ticket_orders_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists ticket_orders_updated_at on public.ticket_orders;

create trigger ticket_orders_updated_at
before update on public.ticket_orders
for each row
execute function public.set_ticket_orders_updated_at();
