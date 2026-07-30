# UniMarket: Marketplace de Economia Circular UNIFOR
 
Plataforma de desapego universitário desenvolvida como desafio técnico do processo seletivo de Estágio Full-Stack do Laboratório Vortex (UNIFOR). Permite que estudantes anunciem itens (livros, calculadoras, jalecos, eletrônicos, etc.) para **venda ou doação**, com busca e filtro por categoria, facilitando o acesso a materiais para quem está ingressando na universidade e dando um destino melhor ao que não é mais usado por quem está se formando.
 
O projeto é dividido em duas aplicações independentes:
 
- **`backend/`** — API RESTful (Node.js + Express + PostgreSQL)
- **`frontend/`** — Interface web responsiva e instalável como PWA (React + TypeScript)
---
 
## Tecnologias utilizadas
 
### Backend
- **Node.js** + **Express** — API REST
- **PostgreSQL** + **Prisma ORM** (com driver adapter `@prisma/adapter-pg`) — persistência de dados
- **JWT (jsonwebtoken)** + **bcryptjs** — autenticação e hash de senha
- **Zod** — validação de dados de entrada
- **CORS** — liberação de acesso para o frontend
### Frontend
- **React** + **TypeScript** + **Vite**
- **React Router** — roteamento com layouts aninhados
- **Tailwind CSS v4** — estilização, com paleta de cores customizada
- **shadcn/ui** (Radix UI) — componentes de interface acessíveis
- **vite-plugin-pwa** — geração de manifest e Service Worker (PWA instalável)
- **lucide-react** — ícones
---
 
## Como rodar o projeto localmente
 
### Pré-requisitos
- [Node.js](https://nodejs.org) 20+
- Uma instância PostgreSQL (local, ou gratuita via [Neon](https://neon.tech)/[Supabase](https://supabase.com))
### 1. Clonar o repositório
 
```bash
git clone https://github.com/ksobreira/UniMarket-vortex.git
cd UniMarket-vortex
```
 
### 2. Backend
 
```bash
cd backend
npm install
```
 
Cria um arquivo `.env` na pasta `backend/`, usando `.env.example` como base:
 
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="gere_uma_string_aleatoria_longa"
PORT=3000
```
 
Roda as migrations e popula o banco com dados de demonstração:
 
```bash
npx prisma migrate dev
npx prisma db seed
```
 
Inicia o servidor:
 
```bash
npm run dev
```
 
A API sobe em `http://localhost:3000`.
 
### 3. Frontend
 
Em outro terminal:
 
```bash
cd frontend
npm install
npm run dev
```
 
A aplicação abre em `http://localhost:5173`.
 
> Para testar a instalação como PWA de verdade (manifest + Service Worker completos), rode `npm run build && npm run preview` em vez de `npm run dev` o modo de desenvolvimento não reflete o comportamento final de produção.
 
---
 
## Deploy

Link do deploy: https://uni-market-vortex.vercel.app/
 
---
 
## Diário de Bordo da IA
 
Durante os 15 dias de desenvolvimento, usei IA generativa como parceira de trabalho em praticamente todas as etapas — da modelagem do banco de dados à revisão de PRs. Documento aqui essa parceria, como pede o edital.
 
### Ferramentas utilizadas
- **Claude** (Anthropic) — principal ferramenta usada ao longo de todo o projeto: planejamento de arquitetura, revisão de código, debug, criação de componentes e organização do histórico de commits/branches/PRs
### Estratégia de engenharia de prompts
 
Usei a IA de duas formas bem diferentes ao longo do projeto: para **gerar** código novo (telas, endpoints, configuração) e, principalmente, para **revisar** o que eu mesmo já tinha escrito — pedindo análise crítica em vez de apenas geração. Alguns prompts reais que usei:
 
1. Ao montar o schema do banco, antes de rodar qualquer migration:
   > "avalie meu schema: [colei o schema.prisma completo]"
2. Pedindo uma auditoria completa do projeto, não só de um arquivo isolado:
   > "chat analisa tudo o que fiz aê, quero uma analise completa do que foi feito até o momento, levando como criterios as coisas que o documento pede, e se esta tudo ok, caso haja algum problema ou algum detalhe nao quero que corriga todo o src, quero os arquivos em código descritos um por um caso haja mais de um para analisar e verificar"
3. Durante um bug real de CORS, fornecendo evidência (prints do DevTools) em vez de só descrever o sintoma:
   > "[print do console mostrando erro de CORS] nada chat" seguido de "[print do Network tab confirmando que o backend respondia via URL direta]"
### Compartilhamento de histórico
_Link do chat de desenvolvimento: a adicionar (exportação da conversa completa usada ao longo do projeto)._
 
### Reflexão crítica
 
O momento mais claro de precisar desconfiar de uma resposta da IA foi durante um bug de conexão entre frontend e backend: o registro/login parava de funcionar com uma mensagem genérica de "erro de conexão com o servidor". Nas primeiras tentativas, a IA levantou hipóteses razoáveis, mas erradas na ordem — sugeriu primeiro que o backend estivesse fora do ar. Só quando testei o endpoint direto pela URL do navegador (confirmando que o backend respondia normalmente) e trouxe o print do painel **Network** do DevTools é que ficou claro que era CORS: o pacote `cors` estava instalado, mas a linha `app.use(cors())` nunca tinha sido adicionada de fato no `app.js`.
 
Isso me ensinou a não aceitar a primeira hipótese da IA como resposta final em bugs de integração — trazer evidência real (prints do console, do Network tab, testar a rota isoladamente) foi o que resolveu, não a suposição inicial. Também percebi, revisando o repositório como um todo próximo do fim do projeto, que algumas branches que planejei junto com a IA (validação de cadastro de usuário, seed do banco) ficaram só no código sugerido e nunca chegaram a ser de fato commitadas — reforçou pra mim que preciso confirmar o estado real do repositório, não assumir que uma sugestão de código vira automaticamente parte do projeto só porque foi discutida.
 
---
 
## Estrutura de pastas (resumo)
 
```
UniMarket-vortex/
├── backend/
│   ├── prisma/          # schema, migrations e seed
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── routes/
│       ├── schemas/      # validação Zod
│       ├── lib/
│       └── services/     # bootstrap do Express (app.js)
└── frontend/
    └── src/
        ├── components/    # ui/, layout/, landing/, listings/, forms/
        ├── pages/
        ├── services/      # comunicação com a API
        ├── context/ hooks/
        ├── types/
        └── lib/
```