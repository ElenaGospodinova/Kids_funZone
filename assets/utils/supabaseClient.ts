import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tgorvivmcpbbmmlzvaeg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnb3J2aXZtY3BiYm1tbHp2YWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTY1NTksImV4cCI6MjAyNDUzMjU1OX0.Rg7vOClsKYZeWxHN3NX_ohtlzRfp3EsRRC-G4fikgKg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})