import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// In local dev without env vars, use a mock client so the app renders normally.
// The live deployment has the real env vars set and is unaffected.
const isMock = !supabaseUrl || !supabaseAnonKey

const mockClient = {
  from: (_table: string) => ({
    insert: (rows: unknown[]) => {
      console.log('[Mock Supabase] insert into', _table, rows)
      return Promise.resolve({ data: rows, error: null })
    },
  }),
}

export const supabase = isMock
  ? (mockClient as unknown as ReturnType<typeof createClient>)
  : createClient(supabaseUrl, supabaseAnonKey)
