
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../../backend-supabase/types/database.types';

const SUPABASE_URL = "https://xpymrggymkhuodlqnruo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweW1yZ2d5bWtodW9kbHFucnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MzI5NDQsImV4cCI6MjA2MDUwODk0NH0.S_Rqc7gO3woilu02792B3CMyz22jRSzR_qGavHhjp9o";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
