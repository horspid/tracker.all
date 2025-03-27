import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fmugazhorfivjtywmcir.supabase.co'
const supabaseKey = import.meta.env.VITE_DB_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
