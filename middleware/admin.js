const authenticateToken = require('./auth');

const adminMiddleware = (req, res, next) => {
  // Primeiro verifica se está autenticado
  authenticateToken(req, res, () => {
    // Verifica se é admin (baseado no payload do token)
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Acesso restrito a administradores' });
    }
  });
};

module.exports = adminMiddleware;