import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

// let process

// const SUPABASE_URL = (process && process?.env['SUPABASE_URL']) || env.PUBLIC_SUPABASE_URL
// const SUPABASE_ANON_KEY = (process && process?.env['SUPABASE_ANON_KEY']) || env.PUBLIC_SUPABASE_ANON_KEY
// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)