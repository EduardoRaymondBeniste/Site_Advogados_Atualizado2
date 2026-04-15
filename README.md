# Adv Turbo Platform

Projeto Node.js + Express + EJS inspirado no layout do `Adv Turbo` (PDF `cartao_eduardo.pdf`). Inclui:
- Landing page responsiva com serviços, depoimentos, planos, pagamentos e cadastro.
- Páginas EJS isoladas para login, cadastro, painel e formulários integrados (clientes, advogados, posts, tarefas, comunicação e contato).
- Estrutura preparada para pagamentos Hotmart/PicPay/Pix/cartões/boleto com placeholders e botões de integração.
- Layout fiel à paleta do PDF e imagens fornecidas no diretório `img/`.
- Banco de dados MySQL com tabelas para usuários (clientes/advogados), posts, comentários, tarefas, agendamentos, pagamentos, comunicações, uploads e contatos.

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Copie `.env.example` para `.env` e ajuste as variáveis de conexão (MySQL + Upserve se necessário).
3. Rode o schema MySQL listado em `db/schema.sql` (use PHPMyAdmin/Upserve no Windows 11).
4. Inicie a aplicação:
   ```
   npm run dev
   ```

## Banco de dados
O arquivo `db/schema.sql` cria o banco `adv_turbo` e tabelas para:
- `users`, `clients`, `lawyers`
- `posts`, `comments`
- `tasks`, `appointments`, `payments`
- `communications`, `posts`, `uploads`, `contacts`
Inclui dados de exemplo (admin, cliente, advogado e plano Hotmart). Substitua as senhas bcrypt (`$2b$10$adt`) por hashes reais quando preparar a autenticação.

## Próximos passos sugeridos
1. Conectar `mysql2` e hashing real com `bcrypt` para criar usuários e logins.
2. Implementar rotas POST que persistam dados em MySQL usando `prepared statements` ou ORM.
3. Integrar com Hotmart/PicPay/NuBank/Upserve via APIs e webhooks para controlar pagamentos e agendamentos em tempo real.
4. Criar camada de autenticação com `express-session` + verificações `isAuthenticated`.
5. Adicionar testes e validações de input no backend e no front (EJS + client-side).
# Site_Advogados_Atualizado
