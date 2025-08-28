# 📋 Todo List

## 📖 Descrição
Aplicação **Full-Stack** para gerenciamento de tarefas.  
- **Backend:** Node.js + Express + TypeORM + PostgreSQL  
- **Frontend:** Vue 3 + Vite + TailwindCSS  

O projeto permite **criar, listar, atualizar e excluir tarefas**, consumindo uma API própria integrada ao banco de dados PostgreSQL.

---

## 🚀 Funcionalidades
- ✅ CRUD de tarefas (criar, listar, atualizar, excluir)  
- 📌 Separação de tarefas por status  
- 🗄️ Banco de dados com **migrations** via TypeORM  
- 🎨 Interface simples e responsiva (Vue + Tailwind)  

---

## ⚙️ Configuração do Projeto

### 🔑 Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta **Back/** e configure:

```dotenv
# Configuração do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=senha_aqui
DB_NAME=nome_do_banco
DB_SYNC=false

# Servidor
PORT=3000
ROUTE=http://localhost:3000
```

No Front/, crie também um .env:
```dotenv
VITE_API_URL=http://localhost:3000
```

### 📦 Instalação

1. Clone o repositório:

   `git clone https://github.com/Almeidaadavid/TodoList.git`
   
   `cd TodoList`

3. Configurar e rodar o Backend:

    ```cd Back```

    ```
    ### Instalar dependências
    npm install

    ### Criar banco e rodar migrations
    npm run migration:generate ./src/migrations/CreateTaskEntity
    npm run migration:run

    ### Rodar em modo desenvolvimento
    npm run dev
    Servidor rodará em: http://localhost:3000
    ```

4. Configurar e rodar o Frontend:

  ```cd Front/todolist```

  ```
  ### Instalar dependências
    npm install

  ### Rodar servidor de desenvolvimento
    npm run dev
  ```

  Frontend rodará em: http://localhost:5173

### 🛠️ Scripts disponíveis
  #### Backend

    npm run dev → inicia servidor em modo desenvolvimento (com hot reload)

    npm run build → compila código TypeScript

    npm run start → roda build compilado

    npm run migration:generate → gera nova migration

    npm run migration:run → aplica migrations

  #### Frontend
      npm run dev → roda em modo desenvolvimento

      npm run build → gera build de produção

      npm run preview → pré-visualiza build

### 🧩 Tecnologias utilizadas
  #### Backend

      Node.js

      Express

      TypeORM

      PostgreSQL

      dotenv

#### Frontend

      Vue 3

      Vite

      Vue Router

      TailwindCSS

      Vue3 Toastify

    
### 🐞 Solução de Problemas Comuns

    Erro ao rodar migrations: confirme se o banco foi criado e se as credenciais no .env estão corretas.

    Erro CORS no frontend: confirme se o ROUTE do backend e VITE_API_URL do frontend estão iguais.

    Dependências quebradas: delete node_modules e package-lock.json (ou yarn.lock) e reinstale com npm install.
   
### 🙌 Agradecimentos
    Obrigado por conferir este projeto!
    Sinta-se à vontade para abrir issues ou enviar pull requests.
