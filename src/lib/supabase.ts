import { createClient } from '@supabase/supabase-js';

// Safe string sanitation for environment variables (strips accidental quotes, spaces, trailing slashes)
const sanitizeEnv = (val?: string): string => {
  if (!val) return '';
  let s = val.trim();
  // Strip enclosing quotes (common when copying from .env files or Vercel UI)
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
};

// Real Supabase environment variables expected in both local development and Vercel
const rawUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_PROJECT_URL ||
  import.meta.env.SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  '';

const rawKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const supabaseUrl = sanitizeEnv(rawUrl).replace(/\/+$/, '');
export const supabaseAnonKey = sanitizeEnv(rawKey);

export const isSupabaseConfigured = (): boolean => {
  const isMissingUrl =
    !supabaseUrl ||
    supabaseUrl === 'https://your-supabase-project.supabase.co' ||
    supabaseUrl.includes('placeholder.supabase.co') ||
    !supabaseUrl.startsWith('http');

  const isMissingKey =
    !supabaseAnonKey ||
    supabaseAnonKey === 'your-supabase-anon-key' ||
    supabaseAnonKey.includes('placeholder-key');

  return !isMissingUrl && !isMissingKey;
};

export const getSupabaseConfigError = (): string | null => {
  if (isSupabaseConfigured()) return null;
  return 'Supabase configuration is required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env or Vercel Environment Variables.';
};

// Safe diagnostic summary (never leaks secrets or keys)
export const getSupabaseConfigAudit = () => {
  let hostname = 'unconfigured';
  try {
    if (supabaseUrl && supabaseUrl.startsWith('http')) {
      hostname = new URL(supabaseUrl).hostname;
    }
  } catch {
    hostname = 'invalid-url-format';
  }

  return {
    isConfigured: isSupabaseConfigured(),
    host: hostname,
    hasAnonKey: Boolean(supabaseAnonKey),
    keyPrefix: supabaseAnonKey ? `${supabaseAnonKey.slice(0, 10)}...` : 'none',
    mode: isSupabaseConfigured() ? 'supabase-connected' : 'unconfigured',
  };
};

// Create Supabase client with persisted auth sessions
export const supabase = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'ahmad_clothing_sb_auth',
    },
  }
);

// Safe startup logging in browser console
if (typeof window !== 'undefined') {
  const audit = getSupabaseConfigAudit();
  if (audit.isConfigured) {
    console.info(
      `[Ahmad Clothing Auth] Connected to Supabase Host: ${audit.host}`
    );
  } else {
    console.warn(
      '[Ahmad Clothing Auth] Real Supabase is required. Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.'
    );
  }
}
