# CineScope

Uma aplicação web para descobrir filmes e séries, consultar informações detalhadas e montar uma lista pessoal de títulos para assistir depois.

## Acesse o projeto

Confira a versão publicada do CineScope:

**[Acessar o CineScope](https://cine-scope-react28.vercel.app/)**

O projeto está hospedado na Vercel.

O CineScope apresenta conteúdos populares no Home, organizados em seções de filmes e séries, com busca, avaliações, sinopses, trailers e informações adicionais sobre cada título.

## Funcionalidades

- Home com filmes e séries populares.
- Navegação por filmes, séries e Minha Lista.
- Busca de filmes e séries pelo nome.
- Cards com poster, ano de lançamento e avaliação.
- Página de detalhes com sinopse, gêneros, status e outras informações.
- Reprodução de trailers disponíveis no YouTube.
- Lista pessoal salva no `localStorage` do navegador.
- Carregamento de mais resultados nas listagens filtradas.
- Layout responsivo para desktop e dispositivos móveis.
- Animações sutis de entrada e interação, com suporte a redução de movimento.

## Tecnologias

- React
- Vite
- Tailwind CSS
- Lucide React
- TMDB API

## Como executar localmente

### Pré-requisitos

- Ambiente com suporte a projetos JavaScript e npm
- Uma chave de acesso da API do [The Movie Database (TMDB)](https://www.themoviedb.org/)

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/oeduardosousa/cine-scope.git
cd cine-scope
npm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_TMDB_TOKEN=seu_token_do_tmdb
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Depois, abra a URL exibida pelo Vite no terminal.

## Scripts disponíveis

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera a versão de produção
npm run preview  # pré-visualiza a versão de produção
npm run lint     # executa o Oxlint
```

## Estrutura principal

```text
src/
├── components/       # Header, Hero, busca, cards, detalhes e Minha Lista
├── services/         # Comunicação com a API do TMDB
├── App.jsx           # Estado e fluxo principal da aplicação
├── index.css         # Estilos globais e animações
└── main.jsx          # Inicialização do React
```

## API e atribuição

As informações de filmes, séries, imagens e trailers são obtidas da API do TMDB. O CineScope não é endossado nem certificado pelo TMDB.

O token da API deve permanecer apenas no arquivo local de ambiente e não deve ser versionado. O arquivo `.env.local` já deve estar incluído no `.gitignore`.

## Status do projeto

Projeto pessoal publicado e em desenvolvimento contínuo, criado para praticar construção de interfaces com React, integração com APIs externas e gerenciamento de estado no navegador.
