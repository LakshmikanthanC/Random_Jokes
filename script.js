// ============================================
// JOKE API Configuration - Multiple APIs
// ============================================
const JOKE_APIS = {
    general: 'https://official-joke-api.appspot.com/random_joke',
    programming: 'https://v2.jokeapi.dev/joke/Programming?type=single',
    dark: 'https://v2.jokeapi.dev/joke/Dark?type=single',
    pun: 'https://v2.jokeapi.dev/joke/Pun?type=single',
    spooky: 'https://v2.jokeapi.dev/joke/Spooky?type=single',
    christmas: 'https://v2.jokeapi.dev/joke/Christmas?type=single'
};

// Additional Dynamic APIs
const MEME_API = 'https://api.reddit.com/r/memes/hot.json?limit=25';
const QUOTE_API = 'https://zenquotes.io/api/random';
const WEATHER_API = 'https://wttr.in/?format=j1';

// DOM Elements
const jokeElement = document.getElementById('joke');
const loadingElement = document.getElementById('loading');
const favoriteBtn = document.getElementById('favoriteBtn');
const copyBtn = document.getElementById('copyBtn');

// State
let favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
let currentJoke = { setup: '', punchline: '', joke: '', category: 'general' };
let currentCategory = 'general';
let jokesViewed = parseInt(localStorage.getItem('jokesViewed')) || 0;
let memesViewed = parseInt(localStorage.getItem('memesViewed')) || 0;

// ============================================
// JOKE FUNCTIONS
// ============================================
function generateJoke() {
    showLoading(true);
    
    const apiUrl = JOKE_APIS[currentCategory] || JOKE_APIS.general;
    
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            let jokeText = '';
            let setup = '';
            let punchline = '';
            
            if (data.setup && data.punchline) {
                setup = data.setup;
                punchline = data.punchline;
                jokeText = `${setup} ${punchline}`;
            } else if (data.joke) {
                jokeText = data.joke;
            }
            
            currentJoke = { setup, punchline, joke: jokeText, category: currentCategory };
            displayJoke(currentJoke);
            updateFavoriteButton(currentJoke);
            
            // Track stats
            jokesViewed++;
            localStorage.setItem('jokesViewed', jokesViewed);
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            if (jokeElement) {
                jokeElement.innerHTML = '<p class="error">Oops! Something went wrong. <button onclick="generateJoke()">Try Again</button></p>';
            }
        })
        .finally(() => {
            showLoading(false);
        });
}

function displayJoke(joke) {
    if (!jokeElement) return;
    
    jokeElement.style.opacity = '0';
    
    setTimeout(() => {
        if (joke.setup && joke.punchline) {
            jokeElement.innerHTML = `
                <p class="joke-setup fade-in">${joke.setup}</p>
                <p class="joke-punchline fade-in">${joke.punchline}</p>
            `;
        } else {
            jokeElement.innerHTML = `<p class="fade-in">${joke.joke}</p>`;
        }
        
        jokeElement.style.opacity = '1';
        jokeElement.style.transition = 'opacity 0.3s ease';
    }, 100);
}

function showLoading(show) {
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}

// ============================================
// FAVORITES FUNCTIONS
// ============================================
function toggleFavorite() {
    if (!currentJoke) {
        alert('No joke to save! Generate a joke first.');
        return;
    }
    
    const jokeText = currentJoke.joke || `${currentJoke.setup} ${currentJoke.punchline}`;
    
    if (!jokeText || jokeText.trim() === '') {
        alert('No joke to save! Generate a joke first.');
        return;
    }
    
    const jokeIndex = favorites.findIndex(f => {
        const fText = f.joke || `${f.setup} ${f.punchline}`;
        return fText === jokeText;
    });
    
    if (jokeIndex > -1) {
        favorites.splice(jokeIndex, 1);
        if (favoriteBtn) favoriteBtn.textContent = '🤍 Save Favorite';
        alert('Removed from favorites!');
    } else {
        favorites.push(currentJoke);
        if (favoriteBtn) favoriteBtn.textContent = '❤️ Saved!';
        
        // Update favorites count
        const favCount = parseInt(localStorage.getItem('jokesFavorited')) || 0;
        localStorage.setItem('jokesFavorited', favCount + 1);
        
        alert('Added to favorites!');
    }
    
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
}

function updateFavoriteButton(jokeData) {
    if (!favoriteBtn || !jokeData) return;
    
    const jokeText = jokeData.joke || `${jokeData.setup} ${jokeData.punchline}`;
    const isFavorite = favorites.some(f => {
        const fText = f.joke || `${f.setup} ${f.punchline}`;
        return fText === jokeText;
    });
    favoriteBtn.textContent = isFavorite ? '❤️ Saved!' : '🤍 Save Favorite';
}

function showFavorites() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favoritesList = document.getElementById('favoritesList');
    
    if (!favoritesList) return;
    
    favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
    
    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="no-favorites">No favorites yet! Save some jokes to see them here.</p>';
    } else {
        favorites.forEach((joke, index) => {
            const jokeCard = document.createElement('div');
            jokeCard.className = 'joke-card fade-in';
            const jokeText = joke.joke || `${joke.setup} ${joke.punchline}`;
            jokeCard.innerHTML = `
                <p><strong>${jokeText}</strong></p>
                <button onclick="removeFavorite(${index})" class="remove-btn">Remove</button>
            `;
            favoritesList.appendChild(jokeCard);
        });
    }
    
    if (favoritesContainer) {
        favoritesContainer.style.display = 'block';
    }
}

function removeFavorite(index) {
    favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
    showFavorites();
    alert('Favorite removed!');
}

function closeFavorites() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    if (favoritesContainer) {
        favoritesContainer.style.display = 'none';
    }
}

// ============================================
// COPY & SHARE FUNCTIONS
// ============================================
function copyJoke() {
    if (!currentJoke) return;
    
    const jokeText = currentJoke.joke || `${currentJoke.setup} ${currentJoke.punchline}`;
    
    navigator.clipboard.writeText(jokeText).then(() => {
        if (copyBtn) {
            copyBtn.textContent = '✅ Copied!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Copy';
            }, 2000);
        }
    });
}

async function shareJoke(platform) {
    if (!currentJoke) return;
    
    const jokeText = currentJoke.joke || `${currentJoke.setup} ${currentJoke.punchline}`;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(jokeText);
    
    let shareUrl;
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent('Check out this joke!')}&summary=${text}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// ============================================
// DARK MODE
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    }
}

function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
    
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    }
}

// ============================================
// CONTACT FORM
// ============================================
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[name="name"]')?.value;
    const email = form.querySelector('input[name="email"]')?.value;
    const message = form.querySelector('textarea')?.value;
    
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        form.reset();
    }
}

// ============================================
// MEMES FUNCTIONS - Dynamic from Reddit API
// ============================================
async function loadMemes() {
    const memesContainer = document.getElementById('memesContainer');
    const loadingElement = document.getElementById('memesLoading');
    
    if (!memesContainer) return;
    
    try {
        if (loadingElement) loadingElement.style.display = 'block';
        
        const response = await fetch(MEME_API);
        const data = await response.json();
        
        const memes = data.data.children
            .filter(post => post.data.post_hint === 'image')
            .slice(0, 12);
        
        memesContainer.innerHTML = '';
        
        memes.forEach((post, index) => {
            const memeCard = document.createElement('div');
            memeCard.className = 'meme-card fade-in';
            memeCard.innerHTML = `
                <img src="${post.data.url}" alt="${post.data.title}" loading="lazy">
                <div class="meme-info">
                    <p>${post.data.title}</p>
                    <div class="meme-stats">
                        <span>⬆️ ${post.data.score}</span>
                        <span>💬 ${post.data.num_comments}</span>
                    </div>
                    <div class="meme-actions">
                        <button onclick="saveMeme('${post.data.url}', '${encodeURIComponent(post.data.title)}')">❤️ Save</button>
                        <button onclick="downloadMeme('${post.data.url}')">⬇️ Download</button>
                    </div>
            `;
            memesContainer.appendChild(memeCard);
        });
        
        // Track memes viewed
        memesViewed += memes.length;
        localStorage.setItem('memesViewed', memesViewed);
        
    } catch (error) {
        console.error('Error loading memes:', error);
        memesContainer.innerHTML = '<p>Failed to load memes. Please try again later.</p>';
    }
    
    if (loadingElement) loadingElement.style.display = 'none';
}

function saveMeme(url, title) {
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];
    
    const memeExists = savedMemes.some(m => m.url === url);
    if (memeExists) {
        alert('Meme already saved!');
        return;
    }
    
    savedMemes.push({ url, title: decodeURIComponent(title) });
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));
    alert('Meme saved!');
}

function downloadMeme(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meme.jpg';
    link.target = '_blank';
    link.click();
}

// ============================================
// WEATHER WIDGET - Dynamic
// ============================================
async function loadWeather() {
    const weatherContainer = document.getElementById('weatherWidget');
    if (!weatherContainer) return;
    
    try {
        const response = await fetch(WEATHER_API);
        const data = await response.json();
        
        const current = data.current_condition[0];
        
        weatherContainer.innerHTML = `
            <div class="weather-info">
                <span class="weather-icon">${getWeatherEmoji(current.weatherCode)}</span>
                <div class="weather-details">
                    <p class="temp">${current.temp_C}°C</p>
                    <p class="location">${data.nearest_area?.[0]?.areaName?.[0]?.value || 'Your Location'}</p>
                    <p class="condition">${current.weatherDesc[0].value}</p>
                </div>
        `;
    } catch (error) {
        weatherContainer.innerHTML = '<p>Weather unavailable</p>';
    }
}

function getWeatherEmoji(code) {
    code = parseInt(code);
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 82) return '🌧️';
    if (code <= 86) return '❄️';
    return '⛈️';
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    
    // Event Listeners
    if (favoriteBtn) favoriteBtn.addEventListener('click', toggleFavorite);
    if (copyBtn) copyBtn.addEventListener('click', copyJoke);
    
    const contactForm = document.querySelector('form');
    if (contactForm) contactForm.addEventListener('submit', handleContactForm);
    
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) darkModeBtn.addEventListener('click', toggleDarkMode);
    
    const showFavBtn = document.getElementById('showFavoritesBtn');
    if (showFavBtn) showFavBtn.addEventListener('click', showFavorites);
    
    const closeFavBtn = document.getElementById('closeFavoritesBtn');
    if (closeFavBtn) closeFavBtn.addEventListener('click', closeFavorites);
    
    const categorySelect = document.getElementById('jokeCategory');
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            generateJoke();
        });
    }
    
    // Load memes if on memes page
    const memesContainer = document.getElementById('memesContainer');
    if (memesContainer) {
        loadMemes();
    }
    
    // Load weather if widget exists
    const weatherWidget = document.getElementById('weatherWidget');
    if (weatherWidget) {
        loadWeather();
    }
    
    // Generate first joke on page load
    generateJoke();
});

// Make all functions available globally
window.generateJoke = generateJoke;
window.toggleFavorite = toggleFavorite;
window.showFavorites = showFavorites;
window.removeFavorite = removeFavorite;
window.closeFavorites = closeFavorites;
window.copyJoke = copyJoke;
window.shareJoke = shareJoke;
window.saveMeme = saveMeme;
window.downloadMeme = downloadMeme;
window.loadMemes = loadMemes;
