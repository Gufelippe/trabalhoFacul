const { createClient } = require('@supabase/supabase-js');

// Log para debug — aparece nos logs do Railway
console.log('=== DEBUG VARIÁVEIS ===');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'OK ✓' : 'AUSENTE ✗');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'OK ✓' : 'AUSENTE ✗');
console.log('Todas as env vars:', Object.keys(process.env).filter(k => k.startsWith('SUPA')));
console.log('=======================');

const supabaseUrl = process.env.SUPABASE_URL || 'https://drkxfgxuyevipaaqkkqr.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
    console.error('ERRO: SUPABASE_SERVICE_ROLE_KEY não encontrada!');
    console.error('Variáveis disponíveis:', Object.keys(process.env).join(', '));
    throw new Error('Variável SUPABASE_SERVICE_ROLE_KEY é obrigatória!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;