#  To-Do List Full Stack
 
Uma aplicação de gerenciamento de tarefas com suporte a modo convidado e autenticação de usuários. Desenvolvido como projeto de estudos full stack.
 
##  Tecnologias
 
### Backend
- **Node.js** + **Express** + **TypeScript**
- **Prisma ORM** + **PostgreSQL**
- **JWT** para autenticação
- **bcrypt** para criptografia de senhas
### Frontend
- **React** + **Vite** + **TypeScript**
- **Tailwind CSS v4**
- **Axios**
- **Framer Motion**
- **Lucide React**
---
 
##  Funcionalidades
 
-  Criar, editar, deletar e marcar tasks como concluídas
-  Filtrar tasks por All / Active / Completed
-  Modo convidado — use sem criar conta (dados salvos no localStorage)
-  Cadastro e login com email e senha
-  Tema claro e escuro
-  Menu lateral retrátil com animações
---
 
##  Como rodar localmente
 
### Pré-requisitos
- Node.js 18+
- PostgreSQL
### Backend
 
```bash
cd backend
npm install
```
 
Crie um arquivo `.env`:
 
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/todolist"
JWT_SECRET="sua_chave_secreta_aqui"
```
 
```bash
npx prisma migrate dev
npm run dev
```
 
O backend roda em `http://localhost:3000`
 
### Frontend
 
```bash
cd frontend
npm install
npm run dev
```
 
O frontend roda em `http://localhost:5173`
 
---
 
##  Deploy
 
- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)
- **Banco de dados** → [Neon](https://neon.tech)
---
 
##  Rotas da API
 
### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /user/register | Cadastro de usuário |
| POST | /user/login | Login de usuário |
 
### Tasks (requer autenticação)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tasks | Listar todas as tasks |
| POST | /tasks | Criar task |
| PUT | /tasks/:id | Atualizar título da task |
| PATCH | /tasks/:id | Alternar status da task |
| DELETE | /tasks/:id | Deletar task |
 
---
