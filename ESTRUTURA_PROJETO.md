# Estrutura do Projeto Amazon Scraper

```
amazon-scraper/
├── 📁 backend/                    # Servidor Express com Bun
│   ├── 📄 package.json           # Dependências do backend
│   └── 📁 src/
│       └── 📄 server.js          # Servidor Express principal
│
├── 📁 frontend/                   # Interface Vite
│   ├── 📄 package.json           # Dependências do frontend
│   ├── 📄 vite.config.js         # Configuração do Vite
│   ├── 📄 index.html             # Página principal
│   ├── 📄 style.css              # Estilos CSS
│   └── 📄 script.js              # Lógica JavaScript
│
├── 📄 README.md                   # Documentação principal
├── 📄 EXEMPLO_USO.md             # Exemplos de uso
├── 📄 ESTRUTURA_PROJETO.md       # Este arquivo
├── 📄 .gitignore                  # Arquivos ignorados pelo Git
├── 📄 install.bat                 # Script de instalação (Windows)
└── 📄 install.sh                  # Script de instalação (Linux/Mac)
```

## 📋 Arquivos Principais

### Backend (`backend/`)
- **`package.json`**: Configuração do projeto Bun com dependências (express, axios, jsdom)
- **`src/server.js`**: Servidor Express com endpoint `/api/scrape` para scraping da Amazon

### Frontend (`frontend/`)
- **`package.json`**: Configuração do projeto Vite
- **`vite.config.js`**: Configuração do servidor de desenvolvimento
- **`index.html`**: Interface HTML com design moderno e responsivo
- **`style.css`**: Estilos CSS com gradientes e animações
- **`script.js`**: Lógica JavaScript para comunicação com a API

### Documentação
- **`README.md`**: Instruções completas de instalação e uso
- **`EXEMPLO_USO.md`**: Exemplos práticos e troubleshooting
- **`ESTRUTURA_PROJETO.md`**: Este arquivo com estrutura detalhada

### Scripts de Instalação
- **`install.bat`**: Script automático para Windows
- **`install.sh`**: Script automático para Linux/Mac
- **`.gitignore`**: Configuração para ignorar arquivos desnecessários

## 🔧 Tecnologias Utilizadas

### Backend
- **Bun**: Runtime JavaScript rápido
- **Express**: Framework web
- **Axios**: Cliente HTTP
- **JSDOM**: Parser HTML

### Frontend
- **Vite**: Build tool moderna
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com gradientes
- **JavaScript ES6+**: Lógica assíncrona

## 🚀 Funcionalidades

### Backend
- ✅ Servidor Express na porta 3000
- ✅ Endpoint `/api/scrape` com parâmetro `keyword`
- ✅ Scraping da Amazon com headers apropriados
- ✅ Extração de dados: título, avaliação, reviews, imagem
- ✅ Tratamento de erros robusto
- ✅ CORS configurado
- ✅ Endpoint de health check

### Frontend
- ✅ Interface moderna e responsiva
- ✅ Campo de busca com validação
- ✅ Loading state com spinner
- ✅ Exibição de produtos em grid
- ✅ Tratamento de erros com feedback visual
- ✅ Cards de produtos com hover effects
- ✅ Sistema de templates para produtos

## 📊 Dados Extraídos

Para cada produto, o sistema extrai:
- **Título**: Nome completo do produto
- **Avaliação**: Número de estrelas (1-5)
- **Reviews**: Quantidade de avaliações
- **Imagem**: URL da imagem do produto
- **Link**: URL direta para o produto na Amazon

## 🎨 Design

### Interface
- Design moderno com gradientes
- Cards com hover effects
- Loading spinner animado
- Responsivo para mobile/desktop
- Ícones Font Awesome
- Cores consistentes (#667eea, #764ba2)

### UX
- Feedback visual para todas as ações
- Estados de loading, erro e sucesso
- Validação de entrada
- Botões com estados disabled
- Mensagens de erro claras

## 🔒 Segurança e Boas Práticas

### Backend
- Headers apropriados para evitar bloqueios
- Validação de parâmetros de entrada
- Tratamento de erros específicos
- Rate limiting implícito
- CORS configurado corretamente

### Frontend
- Sanitização de dados
- Tratamento de erros de rede
- Timeout para requisições
- Validação de entrada
- Feedback visual para usuário

## 📈 Monitoramento

### Logs do Backend
- Console logs detalhados
- Informações sobre produtos encontrados
- Erros com contexto
- Status de requisições

### Logs do Frontend
- Console logs para debug
- Estado da aplicação exposto
- Funções de debug disponíveis
- Monitoramento de erros

## 🛠️ Configuração

### Portas
- **Backend**: 3000
- **Frontend**: 5173

### URLs
- **API**: `http://localhost:3000`
- **Interface**: `http://localhost:5173`
- **Health Check**: `http://localhost:3000/api/health`

## 📝 Observações

1. **Educacional**: Projeto para fins educacionais
2. **Respeito**: Respeite os termos da Amazon
3. **Rate Limiting**: Não abuse das requisições
4. **Estrutura**: Seletores podem precisar de ajustes
5. **Proxy**: Considere usar proxies em produção

## 🎯 Próximos Passos

Possíveis melhorias:
- Cache de resultados
- Paginação
- Filtros avançados
- Sistema de favoritos
- Exportação de dados
- Mais sites de e-commerce
- Interface administrativa 