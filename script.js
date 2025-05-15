// Variáveis do jogo da memória
let gameActive = false;
let timer = 0;
let attempts = 0;
let matches = 0;
let timerInterval;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let difficulty = 'easy';
let cardDeck = [];
let cardPairs = 6; // padrão modo fácil

// Elementos do DOM
const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');
const attemptsElement = document.getElementById('attempts');
const matchesElement = document.getElementById('matches');
const restart = document.getElementById('restart-button');
const difficultySelector = document.getElementById('difficulty');
const victory = document.getElementById('victory');
const playAgain = document.getElementById('play-again');
const finalTime = document.getElementById('final-time');
const finalAttempts = document.getElementById('final-attempts');

// Eventos
restart.addEventListener('click', startGame);
difficultySelector.addEventListener('change', (e) => {
    difficulty = e.target.value;
    startGame();
});
playAgain.addEventListener('click', () => {
    victory.classList.remove('show');
    startGame();
});

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});

function startGame() {
    resetGame();
    gameBoard.classList.remove('easy', 'medium', 'hard');
    gameBoard.classList.add(difficulty);

    switch(difficulty) {
        case 'easy':
            cardPairs = 6;
            break;
        case 'medium':
            cardPairs = 8;
            break;
        case 'hard':
            cardPairs = 12;
            break;
    }

    createCardDeck(cardPairs);
    renderCards();

    startTimer();
    gameActive = true;
}

function resetGame() {
    clearInterval(timerInterval);
    gameActive = false;
    timer = 0;
    attempts = 0;
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    cardDeck = [];

    timerElement.textContent = '0s';
    attemptsElement.textContent = '0';
    matchesElement.textContent = '0';
    gameBoard.innerHTML = '';
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = `${timer}s`;
    }, 1000);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCardDeck(numPairs = 6) {
    cardDeck = [];

    const availableCards = [];
    for (let i = 1; i <= numPairs; i++) {
        availableCards.push(`/images/card${i}.png`);
    }

    for (const cardImage of availableCards) {
        cardDeck.push({ image: cardImage, id: generateId() });
        cardDeck.push({ image: cardImage, id: generateId() });
    }

    shuffle(cardDeck);
    return cardDeck;
}

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

function renderCards() {
    gameBoard.innerHTML = '';

    cardDeck.forEach(card => {
        const cardElement = createCardElement(card);
        gameBoard.appendChild(cardElement);
    });
}

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;

    const front = document.createElement('div');
    front.classList.add('card-face', 'card-front');

    const back = document.createElement('div');
    back.classList.add('card-face', 'card-back');

    const image = document.createElement('img');
    image.src = card.image;
    image.alt = 'Carta';
    front.appendChild(image);

    cardElement.appendChild(front);
    cardElement.appendChild(back);

    cardElement.addEventListener('click', flipCard);

    return cardElement;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    attempts++;
    attemptsElement.textContent = attempts;

    checkForMatch();
}

function checkForMatch() {
    lockBoard = true;

    const firstCardImage = firstCard.querySelector('img').src;
    const secondCardImage = secondCard.querySelector('img').src;
    const isMatch = firstCardImage === secondCardImage;

    if (isMatch) {
        disableCards();
        matches++;
        matchesElement.textContent = matches;

        if (matches === cardPairs) {
            gameComplete();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function gameComplete() {
    clearInterval(timerInterval);
    gameActive = false;

    finalTime.textContent = timer;
    finalAttempts.textContent = attempts;

    setTimeout(() => {
        victory.classList.add('show');
    }, 500);
}
