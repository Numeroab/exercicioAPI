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


# Dar permissão de execução se necessário
chmod +x server.js

# Se o npm não executar
chmod +x node_modules/.bin/*

# No Linux/WSL, use:
npm install
npm start

# Ou diretamente com Node:
node server.js

❌ "Error: EACCES: permission denied"
bash
# Solução:
sudo chmod -R 755 .

{
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js",
    "linux-setup": "chmod +x server.js && chmod -R 755 . && npm install",
    "linux-clean": "sudo fuser -k 3000/tcp"
  }
}