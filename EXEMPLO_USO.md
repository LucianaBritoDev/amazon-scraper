# Exemplos de Uso - Amazon Scraper

## 🚀 Iniciando o Projeto

### 1. Instalação Automática (Recomendado)

**Windows:**
```bash
install.bat
```

**Linux/Mac:**
```bash
chmod +x install.sh
./install.sh
```

### 2. Instalação Manual

**Backend:**
```bash
cd backend
bun install
bun run dev
```

**Frontend (em outro terminal):**
```bash
cd frontend
npm install
npm run dev
```

## 🎯 Como Usar

### Interface Web
1. Acesse `http://localhost:5173`
2. Digite uma palavra-chave (ex: "smartphone", "notebook", "fones de ouvido")
3. Clique em "Buscar"
4. Visualize os resultados

### API Direta
```bash
# Exemplo de busca via curl
curl "http://localhost:3000/api/scrape?keyword=smartphone"

# Exemplo de verificação de saúde da API
curl "http://localhost:3000/api/health"
```

## 📊 Exemplos de Palavras-chave

### Eletrônicos
- `smartphone`
- `notebook`
- `fones de ouvido`
- `tablet`
- `smart tv`

### Casa e Cozinha
- `panela`
- `liquidificador`
- `aspirador`
- `ventilador`

### Livros
- `romance`
- `tecnologia`
- `história`
- `biografia`

### Games
- `playstation`
- `xbox`
- `nintendo`
- `jogos`

## 🔧 Testando a API

### Via Browser
```
http://localhost:3000/api/scrape?keyword=smartphone
```

### Via JavaScript
```javascript
// Exemplo de uso da API
async function testarAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/scrape?keyword=smartphone');
        const data = await response.json();
        console.log('Produtos encontrados:', data.products);
    } catch (error) {
        console.error('Erro:', error);
    }
}

testarAPI();
```

### Via Python
```python
import requests

def testar_api():
    try:
        response = requests.get('http://localhost:3000/api/scrape?keyword=smartphone')
        data = response.json()
        print(f"Produtos encontrados: {len(data['products'])}")
        for produto in data['products']:
            print(f"- {produto['title']}")
    except Exception as e:
        print(f"Erro: {e}")

testar_api()
```

## 🐛 Solução de Problemas

### Backend não inicia
```bash
# Verificar se o Bun está instalado
bun --version

# Se não estiver, instale em: https://bun.sh/
```

### Frontend não inicia
```bash
# Verificar se o Node.js está instalado
node --version

# Se não estiver, instale em: https://nodejs.org/
```

### Erro de CORS
- O backend já está configurado com CORS
- Se persistir, verifique se está acessando `http://localhost:5173`

### Nenhum produto encontrado
- Tente palavras-chave diferentes
- A Amazon pode ter bloqueado temporariamente
- Aguarde alguns minutos e tente novamente

## 📈 Monitoramento

### Logs do Backend
```bash
cd backend
bun run dev
# Observe os logs no terminal
```

### Logs do Frontend
- Abra o DevTools do navegador (F12)
- Vá para a aba Console
- Observe as mensagens de log

## 🔍 Debug

### Console do Navegador
```javascript
// Acesse o console e use:
AmazonScraper.currentSearch() // Ver estado atual
AmazonScraper.performSearch('teste') // Testar busca
```

### API Health Check
```bash
curl http://localhost:3000/api/health
```

## 📝 Notas Importantes

1. **Rate Limiting**: Não faça muitas requisições seguidas
2. **Respeito**: Este projeto é para fins educacionais
3. **Estrutura**: A Amazon pode mudar seu HTML, afetando o scraping
4. **Proxy**: Em produção, considere usar proxies para evitar bloqueios

## 🎨 Personalização

### Mudando a URL da API
No arquivo `frontend/script.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000'; // Mude para sua URL
```

### Mudando a porta do backend
No arquivo `backend/src/server.js`:
```javascript
const PORT = 3000; // Mude para a porta desejada
```

### Mudando a porta do frontend
No arquivo `frontend/vite.config.js`:
```javascript
server: {
    port: 5173, // Mude para a porta desejada
}
``` 