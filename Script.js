// Elementos DOM
const jokeTextElement = document.getElementById('jokeText');
const newJokeBtn = document.getElementById('newJokeBtn');
const favoriteJokeBtn = document.getElementById('favoriteJokeBtn');
const shareJokeBtn = document.getElementById('shareJokeBtn');
const getJokeBtn = document.getElementById('getJokeBtn');
const translateJokeBtn = document.getElementById('translateJokeBtn');
const categoriesList = document.getElementById('categoriesList');
const favoritesList = document.getElementById('favoritesList');
const totalJokesElement = document.getElementById('totalJokes');
const favoriteCountElement = document.getElementById('favoriteCount');
const categoriesCountElement = document.getElementById('categoriesCount');
const navLinks = document.querySelectorAll('nav a');
const contentSections = document.querySelectorAll('.content-section');

// Elementos do Modal de Tradução
const translationModal = document.getElementById('translationModal');
const closeModal = document.querySelector('.close-modal');
const confirmTranslation = document.getElementById('confirmTranslation');

// Estado da aplicação
let currentJoke = null;
let categories = [];
let favorites = JSON.parse(localStorage.getItem('chuckNorrisFavorites')) || [];
let stats = JSON.parse(localStorage.getItem('chuckNorrisStats')) || {
    totalJokes: 0,
    favoriteCount: 0,
    categoriesCount: 0
};

// ===== FUNÇÕES PRINCIPAIS =====

// Buscar piada aleatória
async function fetchRandomJoke(category = null) {
    try {
        jokeTextElement.innerHTML = '<span class="loading"></span> Carregando piada épica...';
        
        const url = category 
            ? `https://api.chucknorris.io/jokes/random?category=${category}`
            : 'https://api.chucknorris.io/jokes/random';
        
        const response = await fetch(url);
        const data = await response.json();
        
        currentJoke = data;
        jokeTextElement.innerHTML = `<p class="joke-text">${data.value}</p>`;
        jokeTextElement.classList.add('fade-in');
        
        // Atualizar estatísticas
        stats.totalJokes++;
        updateStats();
        
        // Remover animação após um tempo
        setTimeout(() => {
            jokeTextElement.classList.remove('fade-in');
        }, 500);
        
    } catch (error) {
        console.error('Erro ao buscar piada:', error);
        jokeTextElement.innerHTML = '<p class="joke-text">Chuck Norris quebrou a API com um roundhouse kick. Tente novamente!</p>';
    }
}

// Buscar categorias
async function fetchCategories() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/categories');
        categories = await response.json();
        displayCategories();
        
        // Atualizar estatísticas
        stats.categoriesCount = categories.length;
        updateStats();
        
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
}

// Exibir categorias
function displayCategories() {
    categoriesList.innerHTML = '';
    
    // Botão para todas as categorias
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.className = 'category-btn active';
    allButton.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        allButton.classList.add('active');
        fetchRandomJoke();
    });
    categoriesList.appendChild(allButton);
    
    // Botões para cada categoria
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.className = 'category-btn';
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            fetchRandomJoke(category);
        });
        categoriesList.appendChild(button);
    });
}

// Adicionar aos favoritos
function addToFavorites() {
    if (!currentJoke) return;
    
    // Verificar se a piada já está nos favoritos
    const isAlreadyFavorite = favorites.some(fav => fav.id === currentJoke.id);
    
    if (!isAlreadyFavorite) {
        favorites.push(currentJoke);
        localStorage.setItem('chuckNorrisFavorites', JSON.stringify(favorites));
        
        // Atualizar estatísticas
        stats.favoriteCount++;
        updateStats();
        
        // Feedback visual
        favoriteJokeBtn.textContent = 'Favoritado!';
        setTimeout(() => {
            favoriteJokeBtn.textContent = 'Favoritar';
        }, 2000);
        
        // Se estiver na seção de favoritos, atualizar a lista
        if (!document.getElementById('favorites-section').classList.contains('hidden')) {
            displayFavorites();
        }
    } else {
        favoriteJokeBtn.textContent = 'Já está nos favoritos!';
        setTimeout(() => {
            favoriteJokeBtn.textContent = 'Favoritar';
        }, 2000);
    }
}

// Exibir favoritos
function displayFavorites() {
    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>Nenhuma piada favoritada ainda. Chuck Norris está decepcionado.</p>';
        return;
    }
    
    favorites.forEach((joke, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item fade-in';
        favoriteItem.innerHTML = `
            <p>${joke.value}</p>
            <button class="remove-favorite" data-index="${index}">Remover</button>
        `;
        favoritesList.appendChild(favoriteItem);
    });
    
    // Adicionar event listeners para os botões de remover
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromFavorites(index);
        });
    });
}

// Remover dos favoritos
function removeFromFavorites(index) {
    favorites.splice(index, 1);
    localStorage.setItem('chuckNorrisFavorites', JSON.stringify(favorites));
    
    // Atualizar estatísticas
    stats.favoriteCount = favorites.length;
    updateStats();
    
    displayFavorites();
}

// Compartilhar piada
function shareJoke() {
    if (!currentJoke) return;
    
    if (navigator.share) {
        navigator.share({
            title: 'Piada do Chuck Norris',
            text: currentJoke.value,
            url: window.location.href
        })
        .then(() => console.log('Piada compartilhada com sucesso!'))
        .catch(error => console.log('Erro ao compartilhar:', error));
    } else {
        // Fallback para copiar para a área de transferência
        navigator.clipboard.writeText(currentJoke.value)
            .then(() => {
                shareJokeBtn.textContent = 'Copiado!';
                setTimeout(() => {
                    shareJokeBtn.textContent = 'Compartilhar';
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar piada: ', err);
                alert('Não foi possível copiar a piada. Tente novamente.');
            });
    }
}

// Atualizar estatísticas
function updateStats() {
    totalJokesElement.textContent = stats.totalJokes;
    favoriteCountElement.textContent = stats.favoriteCount;
    categoriesCountElement.textContent = stats.categoriesCount;
    
    localStorage.setItem('chuckNorrisStats', JSON.stringify(stats));
}

// Alternar entre seções
function switchSection(sectionId) {
    // Esconder todas as seções
    contentSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Mostrar a seção selecionada
    document.getElementById(`${sectionId}-section`).classList.remove('hidden');
    
    // Atualizar navegação
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Se for a seção de favoritos, atualizar a lista
    if (sectionId === 'favorites') {
        displayFavorites();
    }
}

// ===== FUNÇÕES DE TRADUÇÃO =====

// Abrir modal de tradução
function openTranslationModal() {
    if (!currentJoke) {
        alert('Primeiro obtenha uma piada para traduzir!');
        return;
    }
    translationModal.classList.remove('hidden');
}

// Fechar modal de tradução
function closeTranslationModal() {
    translationModal.classList.add('hidden');
}

// Confirmar tradução
function confirmTranslationAction() {
    translationModal.classList.add('hidden');
    performTranslation();
}

// Fechar modal clicando fora
function handleModalClick(e) {
    if (e.target === translationModal) {
        closeTranslationModal();
    }
}

// Executar tradução
async function performTranslation() {
    if (!currentJoke) return;
    
    try {
        jokeTextElement.innerHTML = '<span class="loading"></span> Traduzindo...';
        
        const translatedText = await translateText(currentJoke.value);
        
        // Limpar e mostrar texto traduzido
        jokeTextElement.innerHTML = '';
        
        const jokeParagraph = document.createElement('p');
        jokeParagraph.textContent = translatedText;
        jokeParagraph.className = 'joke-text';
        jokeTextElement.appendChild(jokeParagraph);
        
        // Adicionar indicador de tradução
        const translationIndicator = document.createElement('div');
        translationIndicator.style.marginTop = '10px';
        translationIndicator.style.fontSize = '0.8rem';
        translationIndicator.style.color = '#666';
        translationIndicator.style.fontStyle = 'italic';
        translationIndicator.textContent = '🇧🇷 Traduzido do inglês';
        
        jokeTextElement.appendChild(translationIndicator);
        jokeTextElement.classList.add('fade-in');
        
        setTimeout(() => {
            jokeTextElement.classList.remove('fade-in');
        }, 500);
        
    } catch (error) {
        console.error('Erro na tradução:', error);
        jokeTextElement.innerHTML = '<p class="joke-text">Erro na tradução. Chuck Norris não precisa de tradução!</p>';
        
        // Restaurar piada original após 3 segundos
        setTimeout(() => {
            jokeTextElement.innerHTML = `<p class="joke-text">${currentJoke.value}</p>`;
        }, 3000);
    }
}

// Traduzir texto usando API
async function translateText(text) {
    try {
        const encodedText = encodeURIComponent(text);
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|pt-br`);
        
        if (!response.ok) {
            throw new Error('Erro na API de tradução');
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            return data.responseData.translatedText;
        } else {
            throw new Error('Tradução não disponível');
        }
    } catch (error) {
        console.error('Erro na tradução:', error);
        // Fallback para tradução simulada
        return simulateTranslation(text);
    }
}

// Tradução simulada (fallback)
function simulateTranslation(text) {
    const translations = {
        'roundhouse kick': 'chute giratório',
        'beard': 'barba',
        'tears': 'lágrimas',
        'cry': 'chorar',
        'death': 'morte',
        'kill': 'matar',
        'world': 'mundo',
        'God': 'Deus',
        'hell': 'inferno',
        'devil': 'diabo',
        'gun': 'arma',
        'bullet': 'bala',
        'knock': 'derrubar',
        'punch': 'soco',
        'fight': 'lutar',
        'win': 'vencer',
        'lose': 'perder',
        'strong': 'forte',
        'power': 'poder',
        'fear': 'medo',
        'smile': 'sorriso',
        'laugh': 'rir'
    };
    
    let translated = text;
    for (const [en, pt] of Object.entries(translations)) {
        const regex = new RegExp(`\\b${en}\\b`, 'gi');
        translated = translated.replace(regex, pt);
    }
    
    return translated;
}

// Efeitos visuais adicionais
function addVisualEffects() {
    // Efeito de digitação para a primeira piada
    const initialText = "Clique no botão para obter uma piada épica!";
    jokeTextElement.innerHTML = '';
    typeWriter(jokeTextElement, initialText, 0);
}

function typeWriter(element, text, i) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 50);
    }
}

// Efeito de confete ao favoritar uma piada
function showConfetti() {
    jokeTextElement.classList.add('fade-in');
    setTimeout(() => {
        jokeTextElement.classList.remove('fade-in');
    }, 1000);
}

function addToFavorites() {
    if (!currentJoke) return;
    
    // Verificar se a piada já está nos favoritos
    const isAlreadyFavorite = favorites.some(fav => fav.id === currentJoke.id);
    
    if (!isAlreadyFavorite) {
        favorites.push(currentJoke);
        localStorage.setItem('chuckNorrisFavorites', JSON.stringify(favorites));
        
        // Atualizar estatísticas
        stats.favoriteCount++;
        updateStats();
        
        // Feedback visual
        favoriteJokeBtn.textContent = 'Favoritado!';
        showConfetti();
        
        setTimeout(() => {
            favoriteJokeBtn.textContent = 'Favoritar';
        }, 2000);
        
        // Se estiver na seção de favoritos, atualizar a lista
        if (!document.getElementById('favorites-section').classList.contains('hidden')) {
            displayFavorites();
        }
    } else {
        favoriteJokeBtn.textContent = 'Já está nos favoritos!';
        setTimeout(() => {
            favoriteJokeBtn.textContent = 'Favoritar';
        }, 2000);
    }
}

// Efeito sutil de digitação para o texto inicial
function typeInitialText() {
    const initialText = "Clique no botão para obter uma piada épica!";
    const jokeDisplay = document.querySelector('.joke-text');
    
    if (jokeDisplay && jokeDisplay.textContent === initialText) {
        jokeDisplay.textContent = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < initialText.length) {
                jokeDisplay.textContent += initialText.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    }
}

// Na inicialização, adicione:
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    updateStats();
    setTimeout(typeInitialText, 500);
    console.log('Chuck Norris Jokes - Carregado com sucesso!');
});

// Na inicialização, chame a função de efeitos visuais:
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    updateStats();
    addVisualEffects();
    console.log('Site do Chuck Norris carregado com sucesso!');
});

// ===== EVENT LISTENERS =====

// Piadas

newJokeBtn.addEventListener('click', function() {
    console.log('Botão Nova Piada clicado');
    switchSection('jokes');
    setTimeout(() => {
        fetchRandomJoke();
    }, 100);
});

getJokeBtn.addEventListener('click', () => {
    switchSection('jokes');
    fetchRandomJoke();
});
getJokeBtn.addEventListener('click', () => {
    switchSection('jokes');
    fetchRandomJoke();
});
favoriteJokeBtn.addEventListener('click', addToFavorites);
shareJokeBtn.addEventListener('click', shareJoke);

// Tradução
translateJokeBtn.addEventListener('click', openTranslationModal);
closeModal.addEventListener('click', closeTranslationModal);
confirmTranslation.addEventListener('click', confirmTranslationAction);
translationModal.addEventListener('click', handleModalClick);

// Navegação
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        switchSection(section);
    });
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    updateStats();
    console.log('Site do Chuck Norris carregado com sucesso!');
});