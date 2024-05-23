import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
// import { AppState } from 'react-native'

const supabaseUrl = 'https://hbzjcwabbumckoizavry.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhiempjd2FiYnVtY2tvaXphdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNDM2NjgsImV4cCI6MjAyNDYxOTY2OH0.AZ7AzYWr9m_WWpR90ETL0LwGX64KebPYWK7Uw67TK_U'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true, // Enable persistent authentication
    autoRefreshToken: true, // Automatically refresh tokens
    detectSessionInUrl: false,
  },
})

