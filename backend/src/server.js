const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

// Inicializa o app Express
const app = express();
const PORT = 3000;

// Middleware para CORS (permitir requisições do frontend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware para parsing de JSON
app.use(express.json());

/**
 * Endpoint para fazer scraping de produtos da Amazon
 * GET /api/scrape?keyword=palavra-chave
 */
app.get('/api/scrape', async (req, res) => {
  try {
    // Extrai a palavra-chave dos parâmetros da query
    const { keyword } = req.query;
    
    // Valida se a palavra-chave foi fornecida
    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({
        error: 'Palavra-chave é obrigatória',
        message: 'Forneça uma palavra-chave válida no parâmetro "keyword"'
      });
    }

    console.log(`🔍 Iniciando busca por: "${keyword}"`);

    // URL da Amazon para busca (usando a versão brasileira)
    const searchUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
    
    // Headers para simular um navegador real e evitar bloqueios
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    };

    // Faz a requisição para a Amazon
    console.log('📡 Fazendo requisição para a Amazon...');
    const response = await axios.get(searchUrl, { headers });
    
    // Cria um DOM virtual com o HTML retornado
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Array para armazenar os produtos encontrados
    const products = [];

    // Seletores CSS para encontrar os produtos na página
    // Estes seletores podem precisar de ajustes se a Amazon mudar seu layout
    const productSelectors = [
      '[data-component-type="s-search-result"]',
      '.s-result-item',
      '.sg-col-inner'
    ];

    let productElements = [];
    
    // Tenta diferentes seletores para encontrar os produtos
    for (const selector of productSelectors) {
      productElements = document.querySelectorAll(selector);
      if (productElements.length > 0) {
        console.log(`✅ Encontrados ${productElements.length} produtos usando selector: ${selector}`);
        break;
      }
    }

    // Se não encontrou produtos, tenta uma abordagem mais genérica
    if (productElements.length === 0) {
      console.log('⚠️ Nenhum produto encontrado com seletores específicos, tentando abordagem genérica...');
      productElements = document.querySelectorAll('[data-asin]');
    }

    console.log(`📦 Processando ${productElements.length} produtos encontrados...`);

    // Itera sobre cada produto encontrado
    productElements.forEach((element, index) => {
      try {
        // Extrai o título do produto
        const titleElement = element.querySelector('h2 a, .a-text-normal, [data-cy="title-recipe"]');
        const title = titleElement ? titleElement.textContent.trim() : 'Título não disponível';

        // Extrai a avaliação (estrelas)
        const ratingElement = element.querySelector('.a-icon-alt, [aria-label*="estrela"], [aria-label*="star"]');
        let rating = 'Avaliação não disponível';
        if (ratingElement) {
          const ratingText = ratingElement.getAttribute('aria-label') || ratingElement.textContent;
          const ratingMatch = ratingText.match(/(\d+(?:\.\d+)?)/);
          rating = ratingMatch ? `${ratingMatch[1]} estrelas` : ratingText;
        }

        // Extrai o número de avaliações
        const reviewsElement = element.querySelector('a[href*="reviews"], .a-size-base');
        let reviews = 'Avaliações não disponíveis';
        if (reviewsElement) {
          const reviewsText = reviewsElement.textContent.trim();
          const reviewsMatch = reviewsText.match(/(\d+(?:\.\d+)?[KMB]?)/);
          reviews = reviewsMatch ? `${reviewsMatch[1]} avaliações` : reviewsText;
        }

        // Extrai a URL da imagem
        const imageElement = element.querySelector('img[src], img[data-src]');
        let imageUrl = 'Imagem não disponível';
        if (imageElement) {
          imageUrl = imageElement.getAttribute('src') || imageElement.getAttribute('data-src') || 'Imagem não disponível';
        }

        // Extrai o link do produto
        const linkElement = element.querySelector('a[href*="/dp/"], h2 a');
        let productUrl = '';
        if (linkElement) {
          const href = linkElement.getAttribute('href');
          productUrl = href.startsWith('http') ? href : `https://www.amazon.com.br${href}`;
        }

        // Só adiciona o produto se tiver pelo menos um título válido
        if (title && title !== 'Título não disponível') {
          products.push({
            id: index + 1,
            title,
            rating,
            reviews,
            imageUrl,
            productUrl
          });
        }

      } catch (error) {
        console.log(`❌ Erro ao processar produto ${index + 1}:`, error.message);
      }
    });

    console.log(`✅ Processamento concluído. ${products.length} produtos válidos encontrados.`);

    // Retorna os produtos encontrados
    res.json({
      success: true,
      keyword,
      totalProducts: products.length,
      products
    });

  } catch (error) {
    console.error('❌ Erro durante o scraping:', error.message);
    
    // Retorna erro apropriado baseado no tipo de erro
    if (error.code === 'ENOTFOUND') {
      res.status(503).json({
        error: 'Erro de conexão',
        message: 'Não foi possível conectar com a Amazon. Verifique sua conexão com a internet.'
      });
    } else if (error.response && error.response.status === 403) {
      res.status(403).json({
        error: 'Acesso bloqueado',
        message: 'A Amazon bloqueou o acesso. Tente novamente mais tarde.'
      });
    } else {
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Ocorreu um erro inesperado durante o scraping.',
        details: error.message
      });
    }
  }
});

// Endpoint de teste para verificar se o servidor está funcionando
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor Amazon Scraper funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Rota raiz com informações sobre a API
app.get('/', (req, res) => {
  res.json({
    name: 'Amazon Scraper API',
    version: '1.0.0',
    endpoints: {
      'GET /api/scrape?keyword=termo': 'Faz scraping de produtos da Amazon',
      'GET /api/health': 'Verifica o status do servidor'
    },
    usage: 'Use GET /api/scrape?keyword=sua-palavra-chave para buscar produtos'
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Amazon Scraper rodando na porta ${PORT}`);
  console.log(`📡 Endpoint disponível: http://localhost:${PORT}/api/scrape`);
  console.log(`🔍 Exemplo: http://localhost:${PORT}/api/scrape?keyword=smartphone`);
}); 