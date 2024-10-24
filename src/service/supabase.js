
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rtwmflquinnbaeqbfkpz.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0d21mbHF1aW5uYmFlcWJma3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4NjcwNjIsImV4cCI6MjA0MzQ0MzA2Mn0.vUGkfF6Gw6FrXBICOQr87wleD6VeuuHT_ghzN2DSfSk"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;