# API de Produtos - CRUD com Autenticação JWT

## 📋 Descrição
API RESTful para gerenciamento de produtos com sistema de autenticação JWT e controle de permissões.

## 🚀 Tecnologias
- Node.js
- Express.js
- JWT (JSON Web Tokens)
- bcryptjs
- UUID

## 📦 Instalação
```bash
npm install

JWT: jwt.sign() para criar, jwt.verify() para verificar

BCRYPT: hash() no registro, compare() no login

MIDDLEWARE: Protege rotas com authenticateToken

STATUS HTTP: 200=OK, 201=Criado, 400=Erro usuário, 401=Sem auth, 403=Sem permissão