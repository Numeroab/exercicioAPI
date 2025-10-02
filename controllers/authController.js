const database = require('../utils/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_super_secreto';

const register = async (req, res) => {
    try {
        const { nome, email, senha, role = 'user' } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ 
                message: 'Todos os campos são obrigatórios: nome, email, senha' 
            });
        }

        const existingUser = await database.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = await database.createUser({
            nome,
            email,
            password: hashedPassword,
            role
        });

        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Erro no register:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ 
                message: 'Email e senha são obrigatórios' 
            });
        }

        const user = await database.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
};

module.exports = {
    register,
    login
};