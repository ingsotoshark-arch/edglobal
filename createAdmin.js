import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sjxuaghjgnecscnbeqze.supabase.co';
const supabaseAnonKey = 'sb_publishable_oyfgc6U2xz_YBBilOZDElw_65S0pPCf';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createSupervisor() {
  const { data, error } = await supabase.auth.signUp({
    email: 'ing_soto@hotmail.com',
    password: 'Ea334728',
    options: {
      data: {
        username: 'ingsoto'
      }
    }
  });
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
}

createSupervisor();
