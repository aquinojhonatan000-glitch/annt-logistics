import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ysklygemjlwpsidbfyht.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlza2x5Z2Vtamx3cHNpZGJmeWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MDY0NTIsImV4cCI6MjA5OTI4MjQ1Mn0.t-0e1R_m2wTBI0Gvq5QxWTsWQnRcfNUCngo-b4xOq0I";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);