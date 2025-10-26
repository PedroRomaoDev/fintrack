![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-blueviolet)
![Vite](https://img.shields.io/badge/Vite-frontend-yellow)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-DesignSystem-ff69b4)
![ReactQuery](https://img.shields.io/badge/ReactQuery-DataFetching-red)
![Axios](https://img.shields.io/badge/Axios-HTTP-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-green)

# FinTrack

**FinTrack** – Sistema financeiro fullstack para controle de receitas, despesas e investimentos com autenticação JWT e interface moderna.  
Projeto desenvolvido com foco em **boas práticas de arquitetura**, **segurança**, **escalabilidade** e **organização** — para portfólio, uso acadêmico e pessoal.

---

## Visão geral

Frontend em **React + Vite** consumindo uma **API RESTful** hospedada no Render.  
O projeto utiliza **Tailwind CSS** com o design system **shadcn/ui**, **React Query** para gerenciamento de dados, **Axios** com interceptors para controle de autenticação via JWT e **Context API** para o gerenciamento de estado global de autenticação.

🔗 **API Backend:**  
```
https://finance-app-api-k48s.onrender.com
```

---

## 🧩 Tecnologias principais

- **React (Vite)**
- **Tailwind CSS**
- **Shadcn/ui** (Design System)
- **React Query (TanStack)**
- **Axios + Interceptors**
- **JWT Authentication**
- **Context API (Auth Context)**
- **Recharts** (gráficos dinâmicos)
- **Service Layer Architecture**
- **ESLint + Prettier + Husky**

---

## Instalação & execução

> **Pré-requisitos:**  
> Node.js v16+ e npm ou yarn instalados.

1. **Clone o repositório**
   ```bash
   git clone https://github.com/PedroRomaoDev/fintrack.git
   cd fintrack
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   ```
---

## Estrutura do projeto

```
fintrack/
├─ src/
│  ├─ api/
│  │  ├─ hooks/          # React Query hooks
│  │  └─ services/       # Service Layer (Axios + endpoints)
│  ├─ assets/            # Fontes e Imagens
│  ├─ components/        # Componentes reutilizáveis (UI)
│  ├─ constants/         # Local Storage Keys
│  ├─ contexts/          # Contexto de autenticação
│  ├─ forms/             # Form Hooks e Zod Schemas
│  ├─ helpers/           # Funções auxiliares e formatadores
│  ├─ lib/               # # Configuração do Axios + interceptors
│  ├─ pages/             # Páginas da Aplicação        
└─ main.jsx              # Ponto de Entrada e Rotas
```

---

## Destaques arquiteturais

### **Service Layer**
Centraliza as chamadas à API e aplica interceptors responsáveis por:
- Inserir o token JWT automaticamente nos headers
- Tratar erros globais (401, 403, 500)
- Fazer refresh de tokens quando aplicável

### **React Query**
Gerencia cache, refetch e sincronização de estado com a API de forma performática e reativa.

### **Context API (Auth Context)**
Mantém as informações do usuário autenticado, expõe métodos como `login()`, `logout()`, `refresh()` e controla o acesso a rotas privadas.

### **Design System**
A base visual é construída com **Shadcn/ui + Tailwind**, garantindo consistência, responsividade e velocidade no desenvolvimento.

---

## Autenticação & Segurança

- **JWT Authentication:** gerenciamento de sessão seguro via token.  
- **Axios Interceptors:** automatiza inclusão do token e tratamento de erros.
- **Boas práticas:**   
  - Uso de contextos e hooks para controle centralizado de autenticação.  

---

## Funcionalidades principais

- Login e Logout com JWT  
- Dashboard de finanças com gráficos  
- CRUD de transações (criar, listar, atualizar, deletar)  
- Filtros e categorias personalizáveis  
- Indicadores de investimento, ganho, despesa e saldo  
- Validações de formulário  
- Loading states e tratamento de erros globais  

---

## Boas práticas implementadas

- **Arquitetura modular** (Service Layer, Hooks, Contexts)
- **Clean Code & Separation of Concerns**
- **Padronização com ESLint, Prettier e Husky**
- **Responsividade e UI acessível**
- **Componentização reutilizável**
- **Composição de hooks (React Query + Axios)**

---

## Contribuição

Contribuições são bem-vindas! 🎯

1. Faça um fork do repositório  
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feat/minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "feat: nova funcionalidade X"
   ```
4. Envie sua branch:
   ```bash
   git push origin feat/minha-feature
   ```
5. Abra um **Pull Request**

---

## Contato

 **Autor:** Pedro Romão<br>  
 **E-mail:** pedro7ntj@gmail.com<br>  
 **LinkedIn:** [https://www.linkedin.com/in/pedro-rom%C3%A3o-2615572b3/](https://www.linkedin.com/in/pedro-rom%C3%A3o-2615572b3/)    

