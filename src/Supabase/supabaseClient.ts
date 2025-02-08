import { createClient } from '@supabase/supabase-js'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHR5b2h5dmJpeGp2cXdwanF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzkzMTQsImV4cCI6MjA0NjMxNTMxNH0.qeOD_n8IfukxdhEljK9KsGPHvMoTduKRvtUyqIdg6c8';
const  supabaseUrl = "https://qlhtyohyvbixjvqwpjqx.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)