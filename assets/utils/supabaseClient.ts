import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
// import { AppState } from 'react-native'

const supabaseUrl = 'https://pqqatelwsycnhcldolki.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcWF0ZWx3c3ljbmhjbGRvbGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NDI3NjIsImV4cCI6MjAyNTIxODc2Mn0.PcbJRePCrVMpLLMJANH46zab8RdQmTo8DQ1nWsTGKIQ'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true, // Enable persistent authentication
    autoRefreshToken: true, // Automatically refresh tokens
    detectSessionInUrl: false,
  },
})

