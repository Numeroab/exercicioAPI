const database = require('../utils/db');

const getAllProducts = async (req, res) => {
    try {
        const products = await database.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await database.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const getProductByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'Parâmetro "name" é obrigatório' });
        }

        const products = await database.getProductByName(name);

        if (products.length === 0) {
            return res.status(404).json({ message: 'Nenhum produto encontrado' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao buscar produto por nome:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { nome, descricao, preco, categoria, estoque } = req.body;

        if (!nome || !preco || !categoria || estoque === undefined) {
            return res.status(400).json({ 
                message: 'Campos obrigatórios: nome, preco, categoria, estoque' 
            });
        }

        if (preco < 0) {
            return res.status(400).json({ message: 'Preço não pode ser negativo' });
        }

        if (estoque < 0) {
            return res.status(400).json({ message: 'Estoque não pode ser negativo' });
        }

        const newProduct = await database.createProduct({
            nome,
            descricao: descricao || '',
            preco: parseFloat(preco),
            categoria,
            estoque: parseInt(estoque),
            ativo: true
        });

        res.status(201).json({
            message: 'Produto criado com sucesso',
            product: newProduct
        });

    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, categoria, estoque, ativo } = req.body;

        const existingProduct = await database.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        if (preco !== undefined && preco < 0) {
            return res.status(400).json({ message: 'Preço não pode ser negativo' });
        }

        if (estoque !== undefined && estoque < 0) {
            return res.status(400).json({ message: 'Estoque não pode ser negativo' });
        }

        const updateData = {};
        if (nome !== undefined) updateData.nome = nome;
        if (descricao !== undefined) updateData.descricao = descricao;
        if (preco !== undefined) updateData.preco = parseFloat(preco);
        if (categoria !== undefined) updateData.categoria = categoria;
        if (estoque !== undefined) updateData.estoque = parseInt(estoque);
        if (ativo !== undefined) updateData.ativo = ativo;

        const updatedProduct = await database.updateProduct(id, updateData);

        res.status(200).json({
            message: 'Produto atualizado com sucesso',
            product: updatedProduct
        });

    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await database.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        await database.deleteProduct(id);

        res.status(200).json({
            message: 'Produto deletado com sucesso',
            product: product
        });

    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct
};