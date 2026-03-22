import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables — running in offline mode')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export function isSupabaseConfigured() {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://placeholder.supabase.co'
  )
}

export async function getAgentActivity(limit = 20) {
  if (!isSupabaseConfigured()) return []
  const { data, error } = await supabase
    .from('agent_activity')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) {
    console.error('Error fetching agent activity:', error)
    return []
  }
  return data
}

export async function getAgentProfiles() {
  if (!isSupabaseConfigured()) return []
  const { data, error } = await supabase
    .from('agent_profiles')
    .select('*')
    .order('name')
  if (error) {
    console.error('Error fetching agent profiles:', error)
    return []
  }
  return data
}
