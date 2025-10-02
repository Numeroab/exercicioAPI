const authenticateToken = require('./auth');

const adminMiddleware = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Acesso restrito a administradores' });
        }
    });
};

module.exports = adminMiddleware;