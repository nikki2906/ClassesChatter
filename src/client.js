import { createClient } from '@supabase/supabase-js'

const URL = 'https://brpuzkxpfsbnwotuheio.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJycHV6a3hwZnNibndvdHVoZWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1ODgxMDEsImV4cCI6MjAyOTE2NDEwMX0.4OzDlSLpbjANeELdthByah03Qy6-OU6lH8pi9uNrlyE';
export const supabase = createClient(URL, API_KEY);