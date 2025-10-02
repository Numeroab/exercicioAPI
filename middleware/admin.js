// ❌ ERRADO - Caminho relativo errado
const authenticateToken = require('./auth');

// ✅ CORREÇÃO - Se auth.js está na raiz:
const authenticateToken = require('../auth');
// OU se estiver na mesma pasta:
const authenticateToken = require('./auth');