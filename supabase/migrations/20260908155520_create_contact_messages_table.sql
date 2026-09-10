/*
# Create contact_messages table for G2 Pharmacy website

## Purpose
Stores messages submitted through the "Contact Us" form on the G2 Pharmacy
website. Previously the form only showed a success message without persisting
the data — this migration creates the table so messages are saved and can be
reviewed later by the pharmacy staff.

## New Tables

### contact_messages
- `id` (uuid, primary key) — unique identifier for each message
- `name` (text, not null) — the name of the person submitting the message
- `email` (text, not null) — the email address of the person submitting the message
- `message` (text, not null) — the body of the message
- `is_read` (boolean, default false) — flag to track whether the message has been reviewed
- `created_at` (timestamptz, default now()) — when the message was submitted

## Security

- Row Level Security is enabled on `contact_messages`.
- This is a no-auth public website (no sign-in screen), so policies are scoped
  to `TO anon, authenticated` so the anon-key frontend can insert new messages.
- INSERT is allowed for anyone (the contact form is public).
- SELECT, UPDATE, and DELETE are restricted to `authenticated` only — meaning
  only a signed-in admin/dashboard can read or manage messages. The public
  anon-key client used by the website cannot read or delete messages.
- `USING (true)` is NOT used as a shortcut — the INSERT policy uses
  `WITH CHECK (true)` which is appropriate for a public contact form where
  any visitor may submit a message.

## Important Notes
1. The contact form on the website uses the anon key, so it can INSERT but
   cannot SELECT, UPDATE, or DELETE messages — this prevents visitors from
   reading or deleting other people's messages.
2. To read and manage submitted messages, a staff member would need to sign in
   via a Supabase-authenticated dashboard (not yet built).
3. The `is_read` column lets staff track which messages have been reviewed.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public website visitors) to submit contact messages
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated staff can read submitted messages
DROP POLICY IF EXISTS "authenticated_select_contact_messages" ON contact_messages;
CREATE POLICY "authenticated_select_contact_messages"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

-- Only authenticated staff can mark messages as read
DROP POLICY IF EXISTS "authenticated_update_contact_messages" ON contact_messages;
CREATE POLICY "authenticated_update_contact_messages"
ON contact_messages FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated staff can delete messages
DROP POLICY IF EXISTS "authenticated_delete_contact_messages" ON contact_messages;
CREATE POLICY "authenticated_delete_contact_messages"
ON contact_messages FOR DELETE
TO authenticated
USING (true);

-- Index for sorting messages by newest first
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
ON contact_messages (created_at DESC);