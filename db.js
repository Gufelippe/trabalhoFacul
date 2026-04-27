const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://drkxfgxuyevipaaqkkqr.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
    throw new Error('Variável SUPABASE_SERVICE_ROLE_KEY é obrigatória!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
