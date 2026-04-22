import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // During build or if keys are missing, we return a mock or a client that will fail on use
    // instead of throwing at module level. 
    // In This environment, we expect users to provide these via secrets.
    console.warn('Supabase URL or Key is missing. Please configure them in the Secrets panel.')
    return null
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
