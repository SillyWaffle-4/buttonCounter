// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// We use "import.meta.env" because Vite uses these for security.
// We will fill these values in a later step once the backend is ready.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

