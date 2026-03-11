import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Ensure .env.local is configured.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * DATABASE SCHEMA OVERVIEW (Supabase/PostgreSQL)
 * 
 * profiles:
 *  - id: uuid (pk, references auth.users)
 *  - full_name: text
 *  - role: text (artist/client)
 *  - bio: text
 *  - avatar_url: text
 *  - cover_url: text
 *  - availability: text (available/busy/collab)
 *  - skills: text[]
 *  - location: text
 *  - social_links: jsonb
 * 
 * portfolio_items:
 *  - id: uuid (pk)
 *  - artist_id: uuid (references profiles.id)
 *  - title: text
 *  - description: text
 *  - media_url: text
 *  - media_type: text (image/video/audio)
 *  - category: text
 * 
 * gigs:
 *  - id: uuid (pk)
 *  - client_id: uuid (references profiles.id)
 *  - title: text
 *  - description: text
 *  - budget_range: text
 *  - deadline: timestamp
 *  - status: text (open/closed/urgent)
 *  - skills_needed: text[]
 * 
 * applications:
 *  - id: uuid (pk)
 *  - gig_id: uuid (references gigs.id)
 *  - artist_id: uuid (references profiles.id)
 *  - proposal: text
 *  - status: text (pending/accepted/rejected)
 */
