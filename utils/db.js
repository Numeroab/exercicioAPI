const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '..', 'db.json');

const database = {
  // USERS
  createUser: async (userData) => {
    try {
      const db = await database.readDB();
      
      const newUser = {
        id: uuidv4(),
        ...userData,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      };
      
      db.users.push(newUser);
      await database.saveDB(db);
      return newUser;
    } catch (error) {
      throw new Error('Falha ao criar usuário: ' + error.message);
    }
  },

  getAllUsers: async () => {
    try {
      const db = await database.readDB();
      return db.users;
    } catch (error) {
      throw new Error('Falha ao buscar usuários');
    }
  },

  getUserById: async (id) => {
    try {
      const db = await database.readDB();
      return db.users.find(user => user.id === id) || null;
    } catch (error) {
      throw new Error('Falha ao buscar usuário');
    }
  },

  getUserByEmail: async (email) => {
    try {
      const db = await database.readDB();
      return db.users.find(user => user.email === email) || null;
    } catch (error) {
      throw new Error('Falha ao buscar usuário');
    }
  },

  updateUser: async (id, userData) => {
    try {
      const db = await database.readDB();
      const userIndex = db.users.findIndex(user => user.id === id);
      
      if (userIndex === -1) throw new Error('Usuário não encontrado');
      
      const updatedUser = {
        ...db.users[userIndex],
        ...userData,
        dataAtualizacao: new Date().toISOString()
      };
      
      db.users[userIndex] = updatedUser;
      await database.saveDB(db);
      return updatedUser;
    } catch (error) {
      throw new Error('Falha ao atualizar usuário: ' + error.message);
    }
  },

  deleteUser: async (id) => {
    try {
      const db = await database.readDB();
      const userIndex = db.users.findIndex(user => user.id === id);
      
      if (userIndex === -1) return null;
      
      const deletedUser = db.users[userIndex];
      db.users.splice(userIndex, 1);
      await database.saveDB(db);
      return deletedUser;
    } catch (error) {
      throw new Error('Falha ao deletar usuário');
    }
  },

  // PRODUCTS
  createProduct: async (productData) => {
    try {
      const db = await database.readDB();
      
      const newProduct = {
        id: uuidv4(),
        ...productData,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      };
      
      db.products.push(newProduct);
      await database.saveDB(db);
      return newProduct;
    } catch (error) {
      throw new Error('Falha ao criar produto: ' + error.message);
    }
  },

  getAllProducts: async () => {
    try {
      const db = await database.readDB();
      return db.products;
    } catch (error) {
      throw new Error('Falha ao buscar produtos');
    }
  },

  getProductById: async (id) => {
    try {
      const db = await database.readDB();
      return db.products.find(product => product.id === id) || null;
    } catch (error) {
      throw new Error('Falha ao buscar produto');
    }
  },

  getProductByName: async (name) => {
    try {
      const db = await database.readDB();
      return db.products.filter(product => 
        product.nome.toLowerCase().includes(name.toLowerCase())
      );
    } catch (error) {
      throw new Error('Falha ao buscar produto por nome');
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const db = await database.readDB();
      const productIndex = db.products.findIndex(product => product.id === id);
      
      if (productIndex === -1) throw new Error('Produto não encontrado');
      
      const updatedProduct = {
        ...db.products[productIndex],
        ...productData,
        dataAtualizacao: new Date().toISOString()
      };
      
      db.products[productIndex] = updatedProduct;
      await database.saveDB(db);
      return updatedProduct;
    } catch (error) {
      throw new Error('Falha ao atualizar produto: ' + error.message);
    }
  },

  deleteProduct: async (id) => {
    try {
      const db = await database.readDB();
      const productIndex = db.products.findIndex(product => product.id === id);
      
      if (productIndex === -1) return null;
      
      const deletedProduct = db.products[productIndex];
      db.products.splice(productIndex, 1);
      await database.saveDB(db);
      return deletedProduct;
    } catch (error) {
      throw new Error('Falha ao deletar produto');
    }
  },

  // DATABASE OPERATIONS
  readDB: async () => {
    try {
      const data = await fs.readFile(DB_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return { users: [], products: [] };
    }
  },

  saveDB: async (data) => {
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error('Erro ao salvar dados no arquivo');
    }
  }
};

module.exports = database;