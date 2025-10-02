const database = require('../utils/db');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const users = await database.getAllUsers();
        
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.status(200).json(usersWithoutPasswords);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await database.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const { password, ...userWithoutPassword } = user;

        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        const existingUser = await database.getUserById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (email && email !== existingUser.email) {
            const allUsers = await database.getAllUsers();
            const emailExists = allUsers.find(user => 
                user.email === email && user.id !== id
            );
            if (emailExists) {
                return res.status(400).json({ message: 'Email já está em uso' });
            }
        }

        const updateData = {};
        if (nome) updateData.nome = nome;
        if (email) updateData.email = email;
        
        if (senha) {
            updateData.password = await bcrypt.hash(senha, 10);
        }

        const updatedUser = await database.updateUser(id, updateData);

        const { password: _, ...userWithoutPassword } = updatedUser;

        res.status(200).json({
            message: 'Usuário atualizado com sucesso',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await database.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await database.deleteUser(id);

        const { password, ...userWithoutPassword } = user;

        res.status(200).json({
            message: 'Usuário deletado com sucesso',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};