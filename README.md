# GitHub Explorer

Aplicacao client-side que consulta a API do GitHub e exibe os repositorios mais populares de um determinado usuario. Desenvolvida como desafio front-end da Desbravador Software.

## Demo

> **Aplicacao publicada:** https://testecode.vercel.app

## Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Rotas | React Router v7 |
| HTTP Client | Axios |
| Layout Responsivo | Bootstrap 5 (grid, utilities, componentes) |
| Icons | Lucide React (SVG) |
| Tipografia | Space Grotesk + DM Sans (Google Fonts) |
| Design System | CSS custom properties + Bootstrap (baseado no UI/UX Pro Max Skill v2.0) |

## Funcionalidades

- Busca de usuarios do GitHub com sugestoes na tela inicial
- Exibicao de detalhes do perfil (avatar, bio, seguidores, seguindo, e-mail, localizacao, empresa, blog)
- Listagem de repositorios ordenados por estrelas (decrescente por padrao)
- Alteracao da ordenacao por estrelas, forks, nome ou data de atualizacao (crescente/decrescente)
- Pagina de detalhes do repositorio com estrelas, forks, issues, linguagem e link externo para o GitHub
- Tema claro/escuro com toggle e persistencia via localStorage
- Respeita preferencia do sistema (`prefers-color-scheme`)
- Layout totalmente responsivo com Bootstrap (375px a 1440px+)
- Animacoes suaves (150-300ms) com suporte a `prefers-reduced-motion`
- Acessibilidade: focus states visiveis, touch targets >= 44px, aria-labels

## APIs consumidas

| Endpoint | Descricao |
|----------|-----------|
| `GET /users/{username}` | Detalhes de um usuario |
| `GET /users/{username}/repos` | Repositorios de um usuario |
| `GET /repos/{owner}/{repo}` | Detalhes de um repositorio |

Documentacao: https://docs.github.com/en/rest

## Instalacao e execucao

```bash
# Clonar o repositorio
git clone <url-do-repositorio>
cd github-explorer

# Instalar dependencias
npm install

# Iniciar em modo de desenvolvimento
npm run dev
```

A aplicacao estara disponivel em `http://localhost:5173`.

## Build de producao

```bash
npm run build
npm run preview
```

## Deploy

### Vercel (recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer deploy (siga as instrucoes de login)
vercel

# Deploy de producao
vercel --prod
```

### Surge

```bash
# Instalar Surge
npm install -g surge

# Build e deploy
npm run build
cp dist/index.html dist/200.html
surge dist github-explorer-desbravador.surge.sh
```

### Netlify

Conecte o repositorio no painel do Netlify com:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

## Estrutura do projeto

```
src/
├── components/            # Componentes reutilizaveis
│   ├── SearchBar.tsx      # Barra de busca no navbar
│   ├── UserCard.tsx       # Card com detalhes do usuario
│   ├── RepoList.tsx       # Lista de repos com ordenacao
│   └── GitHubIcon.tsx     # Icone SVG do GitHub
├── hooks/                 # Custom hooks
│   └── useTheme.ts        # Hook de tema dark/light
├── pages/                 # Paginas da aplicacao
│   ├── HomePage.tsx       # Pagina inicial com hero e busca
│   ├── UserPage.tsx       # Perfil do usuario + repositorios
│   └── RepoPage.tsx       # Detalhes de um repositorio
├── services/              # Servicos de API
│   └── github.ts          # Chamadas a API do GitHub via Axios
├── styles/                # Design system e estilos
│   ├── design-tokens.css  # Tokens de cor, tipografia, spacing, shadows
│   ├── global.css         # Reset, layout, navbar, cards, badges, botoes
│   └── pages.css          # Estilos especificos de paginas e componentes
├── App.tsx                # Componente raiz com rotas e navbar
└── main.tsx               # Entry point
```

## Rotas

| Rota | Descricao |
|------|-----------|
| `/` | Pagina inicial com campo de busca e sugestoes |
| `/user/:username` | Perfil do usuario e lista de repositorios |
| `/user/:username/repo/:repoName` | Detalhes de um repositorio |

## Design System

O design segue as diretrizes do [UI/UX Pro Max Skill v2.0](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill):

- **Layout**: Bootstrap 5 grid system (container, row, col-*) + utilities (d-flex, gap-*, text-*, fw-*, etc.)
- **Paleta**: SaaS/Dev Tools com semantic color tokens (light e dark)
- **Tipografia**: Tech Startup pairing (Space Grotesk + DM Sans)
- **Spacing**: Sistema 4/8dp
- **Icons**: Lucide React (SVG) — sem emojis como elementos estruturais
- **Acessibilidade**: Contraste >= 4.5:1, focus states, keyboard nav, aria-labels
- **Responsividade**: Mobile-first, breakpoints Bootstrap (sm/md/lg/xl/xxl)
- **Animacoes**: 150-300ms com `cubic-bezier(0.4, 0, 0.2, 1)`, respeita `prefers-reduced-motion`

## Checklist de requisitos

- [x] Nao utiliza frameworks Vue, Angular, etc. (usa React)
- [x] Uso obrigatorio de rotas (React Router v7)
- [x] Axios para requisicoes HTTP
- [x] Layout responsivo seguindo padroes Bootstrap 5
- [x] Buscar usuario do GitHub
- [x] Detalhes do usuario (avatar, bio, seguidores, seguidos, e-mail)
- [x] Listagem de repos ordenados por estrelas (decrescente)
- [x] Alteracao da ordenacao
- [x] Pagina de detalhes do repositorio (nome, descricao, estrelas, linguagem, link externo)
- [x] README com instrucoes de instalacao e execucao
- [x] Tema dark/light (diferencial)
- [x] Animacoes e micro-interacoes (diferencial)
- [x] Acessibilidade (diferencial)
- [x] Design system profissional (diferencial)
