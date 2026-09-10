/*
# Create staff_members whitelist table

## Purpose
Restricts who can create a staff account on the G2 Pharmacy admin dashboard.
Only emails listed in this table are allowed to sign up. The first staff
member is seeded during this migration so there is always at least one
authorized person who can manage the whitelist.

## New Tables

### staff_members
- `id` (uuid, primary key)
- `email` (text, unique, not null) — the email allowed to create a staff account
- `created_at` (timestamptz, default now())

## Security
- RLS enabled on `staff_members`.
- SELECT is open to `anon, authenticated` — the sign-up page needs to check
  whether an email is whitelisted before allowing account creation, and that
  check runs as the anon key.
- INSERT / UPDATE / DELETE are restricted to `authenticated` only — only a
  signed-in staff member can add or remove other authorized emails.

## Seeded Data
- Inserts `admin@g2pharmacy.com` as the initial whitelisted email so the first
  account can be created. This can be changed later from the dashboard.

## Important Notes
1. The sign-up flow checks this table before calling supabase.auth.signUp().
   If the email is not in the whitelist, sign-up is blocked.
2. Once the first account is created, that staff member can add/remove other
  authorized emails from the dashboard.
3. The initial whitelisted email (admin@g2pharmacy.com) should be changed to
   the real owner's email after first login.
*/

CREATE TABLE IF NOT EXISTS staff_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to check if an email is whitelisted (needed during sign-up)
DROP POLICY IF EXISTS "anon_select_staff_members" ON staff_members;
CREATE POLICY "anon_select_staff_members"
ON staff_members FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated staff can add whitelisted emails
DROP POLICY IF EXISTS "authenticated_insert_staff_members" ON staff_members;
CREATE POLICY "authenticated_insert_staff_members"
ON staff_members FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated staff can remove whitelisted emails
DROP POLICY IF EXISTS "authenticated_delete_staff_members" ON staff_members;
CREATE POLICY "authenticated_delete_staff_members"
ON staff_members FOR DELETE
TO authenticated
USING (true);

-- Seed the initial admin email
INSERT INTO staff_members (email)
VALUES ('admin@g2pharmacy.com')
ON CONFLICT (email) DO NOTHING;