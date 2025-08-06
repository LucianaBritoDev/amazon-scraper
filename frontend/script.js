/**
 * Amazon Scraper Frontend
 * Script principal para gerenciar a interface e comunicação com a API
 */

// Configurações da API
const API_BASE_URL = 'http://localhost:3000';
const API_ENDPOINTS = {
    scrape: '/api/scrape',
    health: '/api/health'
};

// Elementos do DOM
const elements = {
    // Formulário de busca
    searchForm: document.getElementById('searchForm'),
    keywordInput: document.getElementById('keywordInput'),
    searchBtn: document.getElementById('searchBtn'),
    
    // Seções de conteúdo
    loadingSection: document.getElementById('loadingSection'),
    resultsSection: document.getElementById('resultsSection'),
    errorSection: document.getElementById('errorSection'),
    noResultsSection: document.getElementById('noResultsSection'),
    
    // Elementos de resultados
    resultsTitle: document.getElementById('resultsTitle'),
    resultsCount: document.getElementById('resultsCount'),
    productsGrid: document.getElementById('productsGrid'),
    
    // Elementos de erro
    errorTitle: document.getElementById('errorTitle'),
    errorMessage: document.getElementById('errorMessage'),
    retryBtn: document.getElementById('retryBtn'),
    
    // Botões de ação
    clearResults: document.getElementById('clearResults'),
    
    // Template
    productTemplate: document.getElementById('productTemplate')
};

// Estado da aplicação
let currentSearch = {
    keyword: '',
    results: []
};

/**
 * Inicializa a aplicação
 */
function init() {
    console.log('🚀 Iniciando Amazon Scraper Frontend...');
    
    // Adiciona event listeners
    setupEventListeners();
    
    // Verifica se a API está disponível
    checkApiHealth();
}

/**
 * Configura todos os event listeners da aplicação
 */
function setupEventListeners() {
    // Formulário de busca
    elements.searchForm.addEventListener('submit', handleSearch);
    
    // Botão de limpar resultados
    elements.clearResults.addEventListener('click', clearResults);
    
    // Botão de tentar novamente
    elements.retryBtn.addEventListener('click', retrySearch);
    
    // Enter no campo de busca
    elements.keywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(e);
        }
    });
}

/**
 * Verifica se a API está funcionando
 */
async function checkApiHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.health}`);
        if (response.ok) {
            console.log('✅ API está funcionando corretamente');
        } else {
            console.warn('⚠️ API retornou status não OK');
        }
    } catch (error) {
        console.warn('⚠️ Não foi possível conectar com a API:', error.message);
    }
}

/**
 * Manipula o envio do formulário de busca
 * @param {Event} event - Evento do formulário
 */
async function handleSearch(event) {
    event.preventDefault();
    
    const keyword = elements.keywordInput.value.trim();
    
    // Valida se a palavra-chave foi fornecida
    if (!keyword) {
        showError('Palavra-chave obrigatória', 'Digite uma palavra-chave para buscar produtos.');
        return;
    }
    
    // Atualiza o estado da busca
    currentSearch.keyword = keyword;
    
    // Inicia a busca
    await performSearch(keyword);
}

/**
 * Executa a busca de produtos
 * @param {string} keyword - Palavra-chave para busca
 */
async function performSearch(keyword) {
    try {
        // Mostra loading
        showLoading();
        
        // Desabilita o botão de busca
        setSearchButtonState(true);
        
        console.log(`🔍 Iniciando busca por: "${keyword}"`);
        
        // Faz a requisição para a API
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.scrape}?keyword=${encodeURIComponent(keyword)}`);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro HTTP ${response.status}`);
        }
        
        // Processa a resposta
        const data = await response.json();
        
        console.log(`✅ Busca concluída. ${data.totalProducts} produtos encontrados.`);
        
        // Atualiza o estado com os resultados
        currentSearch.results = data.products || [];
        
        // Exibe os resultados
        displayResults(data);
        
    } catch (error) {
        console.error('❌ Erro durante a busca:', error);
        
        // Determina o tipo de erro para exibir mensagem apropriada
        let errorTitle = 'Erro na Busca';
        let errorMessage = 'Ocorreu um erro durante a busca. Tente novamente.';
        
        if (error.message.includes('Failed to fetch')) {
            errorTitle = 'Erro de Conexão';
            errorMessage = 'Não foi possível conectar com o servidor. Verifique se o backend está rodando.';
        } else if (error.message.includes('Erro HTTP 403')) {
            errorTitle = 'Acesso Bloqueado';
            errorMessage = 'A Amazon bloqueou temporariamente o acesso. Tente novamente em alguns minutos.';
        } else if (error.message.includes('Erro HTTP 503')) {
            errorTitle = 'Serviço Indisponível';
            errorMessage = 'O serviço está temporariamente indisponível. Tente novamente mais tarde.';
        }
        
        showError(errorTitle, errorMessage);
        
    } finally {
        // Reabilita o botão de busca
        setSearchButtonState(false);
    }
}

/**
 * Exibe os resultados da busca
 * @param {Object} data - Dados retornados pela API
 */
function displayResults(data) {
    const { keyword, totalProducts, products } = data;
    
    // Atualiza o título e contador
    elements.resultsTitle.textContent = `Resultados para "${keyword}"`;
    elements.resultsCount.textContent = `${totalProducts} produto${totalProducts !== 1 ? 's' : ''} encontrado${totalProducts !== 1 ? 's' : ''}`;
    
    // Limpa o grid de produtos
    elements.productsGrid.innerHTML = '';
    
    if (products && products.length > 0) {
        // Cria os cards de produtos
        products.forEach(product => {
            const productCard = createProductCard(product);
            elements.productsGrid.appendChild(productCard);
        });
        
        // Mostra a seção de resultados
        showResults();
        
    } else {
        // Mostra mensagem de nenhum resultado
        showNoResults();
    }
}

/**
 * Cria um card de produto
 * @param {Object} product - Dados do produto
 * @returns {HTMLElement} Elemento do card
 */
function createProductCard(product) {
    // Clona o template
    const template = elements.productTemplate;
    const card = template.content.cloneNode(true);
    
    // Preenche os dados do produto
    const img = card.querySelector('.product-img');
    const title = card.querySelector('.product-title');
    const ratingStars = card.querySelector('.rating-stars');
    const ratingText = card.querySelector('.rating-text');
    const reviewsText = card.querySelector('.reviews-text');
    const viewProductLink = card.querySelector('.view-product');
    
    // Configura a imagem
    if (product.imageUrl && product.imageUrl !== 'Imagem não disponível') {
        img.src = product.imageUrl;
        img.alt = product.title;
    } else {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDODkuNTQ0IDcwIDgxIDc4LjU0NCA4MSA4OVYxMTFDODEgMTIxLjQ1NiA4OS41NDQgMTMwIDEwMCAxMzBDMTEwLjQ1NiAxMzAgMTE5IDEyMS40NTYgMTE5IDExMVY4OUMxMTkgNzguNTQ0IDExMC40NTYgNzAgMTAwIDcwWiIgZmlsbD0iI0NDQyIvPgo8cGF0aCBkPSJNMTUwIDg5SDE1MUMxNTUuNTIzIDg5IDE1OSA5Mi40NzcgMTU5IDk3VjExM0MxNTkgMTE3LjUyMyAxNTUuNTIzIDEyMSAxNTEgMTIxSDE0OUMxNDQuNDc3IDEyMSAxNDEgMTE3LjUyMyAxNDEgMTEzVjk3QzE0MSA5Mi40NzcgMTQ0LjQ3NyA4OSAxNDkgODlIMTUwWiIgZmlsbD0iI0NDQyIvPgo8L3N2Zz4K';
        img.alt = 'Imagem não disponível';
    }
    
    // Configura o título
    title.textContent = product.title;
    
    // Configura a avaliação
    if (product.rating && product.rating !== 'Avaliação não disponível') {
        ratingText.textContent = product.rating;
        
        // Extrai o número de estrelas para exibir ícones
        const ratingMatch = product.rating.match(/(\d+(?:\.\d+)?)/);
        if (ratingMatch) {
            const ratingValue = parseFloat(ratingMatch[1]);
            const fullStars = Math.floor(ratingValue);
            const hasHalfStar = ratingValue % 1 !== 0;
            
            let starsHTML = '';
            for (let i = 0; i < fullStars; i++) {
                starsHTML += '<i class="fas fa-star"></i>';
            }
            if (hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            const emptyStars = 5 - Math.ceil(ratingValue);
            for (let i = 0; i < emptyStars; i++) {
                starsHTML += '<i class="far fa-star"></i>';
            }
            
            ratingStars.innerHTML = starsHTML;
        }
    } else {
        ratingText.textContent = 'Avaliação não disponível';
        ratingStars.innerHTML = '<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
    }
    
    // Configura as avaliações
    reviewsText.textContent = product.reviews;
    
    // Configura o link do produto
    if (product.productUrl) {
        viewProductLink.href = product.productUrl;
    } else {
        viewProductLink.style.display = 'none';
    }
    
    return card;
}

/**
 * Tenta a busca novamente
 */
function retrySearch() {
    if (currentSearch.keyword) {
        performSearch(currentSearch.keyword);
    }
}

/**
 * Limpa os resultados da busca
 */
function clearResults() {
    currentSearch = {
        keyword: '',
        results: []
    };
    
    elements.keywordInput.value = '';
    elements.productsGrid.innerHTML = '';
    
    hideAllSections();
}

/**
 * Mostra a seção de loading
 */
function showLoading() {
    hideAllSections();
    elements.loadingSection.classList.remove('hidden');
}

/**
 * Mostra a seção de resultados
 */
function showResults() {
    hideAllSections();
    elements.resultsSection.classList.remove('hidden');
}

/**
 * Mostra a seção de erro
 * @param {string} title - Título do erro
 * @param {string} message - Mensagem do erro
 */
function showError(title, message) {
    hideAllSections();
    
    elements.errorTitle.textContent = title;
    elements.errorMessage.textContent = message;
    elements.errorSection.classList.remove('hidden');
}

/**
 * Mostra a seção de nenhum resultado
 */
function showNoResults() {
    hideAllSections();
    elements.noResultsSection.classList.remove('hidden');
}

/**
 * Esconde todas as seções
 */
function hideAllSections() {
    elements.loadingSection.classList.add('hidden');
    elements.resultsSection.classList.add('hidden');
    elements.errorSection.classList.add('hidden');
    elements.noResultsSection.classList.add('hidden');
}

/**
 * Define o estado do botão de busca
 * @param {boolean} disabled - Se o botão deve estar desabilitado
 */
function setSearchButtonState(disabled) {
    elements.searchBtn.disabled = disabled;
    
    if (disabled) {
        elements.searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
    } else {
        elements.searchBtn.innerHTML = '<i class="fas fa-search"></i> Buscar';
    }
}

/**
 * Função utilitária para fazer requisições HTTP
 * @param {string} url - URL da requisição
 * @param {Object} options - Opções da requisição
 * @returns {Promise} Promise da requisição
 */
async function fetchWithTimeout(url, options = {}) {
    const timeout = 30000; // 30 segundos
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);

// Exporta funções para uso em console (debug)
window.AmazonScraper = {
    performSearch,
    clearResults,
    retrySearch,
    currentSearch: () => currentSearch
}; 