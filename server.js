const express = require('express');
const cors = require('cors');

// ✅ CORREÇÃO: Importar das pastas corretas
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users'); 
const productsRoutes = require('./routes/products');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

// Rota de saúde
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Produtos Online!',
    endpoints: {
      auth: ['POST /auth/register', 'POST /auth/login'],
      products: ['GET /products', 'GET /products/search', 'GET /products/:id', 'POST /products', 'PUT /products/:id', 'DELETE /products/:id'],
      users: ['GET /users', 'GET /users/:id', 'PUT /users/:id', 'DELETE /users/:id']
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});