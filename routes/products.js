const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); // ✅ ../middleware/
const adminMiddleware = require('../middleware/admin'); // ✅ ../middleware/

const {
    getAllProducts,
    getProductById,
    getProductByName, // ✅ CORRIGIDO: getProductByName (não getProducByName)
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController'); // ✅ ../controllers/

// Rotas públicas (qualquer um pode acessar)
router.get('/', getAllProducts);
router.get('/search', getProductByName);
router.get('/:id', getProductById);

// Rotas protegidas (apenas administradores)
router.post('/', authenticateToken, adminMiddleware, createProduct);
router.put('/:id', authenticateToken, adminMiddleware, updateProduct);
router.delete('/:id', authenticateToken, adminMiddleware, deleteProduct);

module.exports = router;