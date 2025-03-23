import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fmugazhorfivjtywmcir.supabase.co'
export const supabaseKey = import.meta.env.VITE_DB_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

  