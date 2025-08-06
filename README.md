# Amazon Scraper

Um projeto completo para fazer scraping de produtos da Amazon usando backend em Bun e frontend em Vite.

## 🚀 Características

- **Backend**: Servidor Express com Bun
- **Frontend**: Interface moderna com Vite
- **Scraping**: Extração de dados de produtos da Amazon
- **API REST**: Endpoint para busca de produtos
- **Interface Responsiva**: Design limpo e organizado

## 📋 Pré-requisitos

- [Bun](https://bun.sh/) instalado
- [Node.js](https://nodejs.org/) (para o frontend)

## 🛠️ Instalação

### Backend

1. Navegue para a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
bun install
```

3. Inicie o servidor:
```bash
bun run dev
```

O backend estará rodando em `http://localhost:3000`

### Frontend

1. Em outro terminal, navegue para a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 🎯 Como Usar

1. Abra o navegador e acesse `http://localhost:5173`
2. Digite uma palavra-chave no campo de busca
3. Clique no botão "Buscar Produtos"
4. Os resultados serão exibidos na tela

## 📊 Dados Extraídos

Para cada produto encontrado, são extraídos:
- **Título**: Nome do produto
- **Avaliação**: Número de estrelas (1-5)
- **Número de Avaliações**: Quantidade de reviews
- **Imagem**: URL da imagem do produto

## ⚠️ Observações Importantes

### Tratamento de Erros
- O backend inclui tratamento para erros de rede
- Validação de parâmetros de entrada
- Tratamento de erros de parsing HTML
- Frontend com feedback visual para erros

### Boas Práticas
- Código bem comentado e estruturado
- Separação clara entre backend e frontend
- Uso de async/await para operações assíncronas
- Headers apropriados para evitar bloqueios
- Rate limiting implícito através de delays

### Limitações
- Scraping apenas da primeira página de resultados
- Dependência da estrutura HTML da Amazon
- Possível necessidade de ajustes caso a Amazon mude seu layout

## 🏗️ Estrutura do Projeto

```
amazon-scraper/
├── backend/
│   ├── package.json
│   ├── bun.lockb
│   └── src/
│       └── server.js
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## 🔧 Tecnologias Utilizadas

### Backend
- **Bun**: Runtime JavaScript
- **Express**: Framework web
- **Axios**: Cliente HTTP
- **JSDOM**: Parser HTML

### Frontend
- **Vite**: Build tool
- **HTML5**: Estrutura
- **CSS3**: Estilização
- **JavaScript**: Lógica

## 📝 Licença

Este projeto é para fins educacionais. Respeite os termos de uso da Amazon. 