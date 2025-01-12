
let currentLevel = 1;
let words = ["chat", "chien", "soleil", "ordinateur", "livre"];
let phrases = ["Le soleil brille", "Un chat joue dans le jardin", "Un ordinateur puissant"];
let paragraphs = ["La vie est belle quand on apprend à taper rapidement sur un clavier."];
let score = 0;
let totalWords = 0;
let time = 30;
let interval;
let progress = 0;

// Lancer le jeu
function startGame(level) {
    currentLevel = level;
    score = 0;
    totalWords = 0;
    time = 30;
    progress = 0;
    document.getElementById('score').innerText = score;

    document.getElementById('level-select').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('level-title').innerText = `Niveau ${level}`;
    document.getElementById('progress-bar').style.width = "0%";

    loadNextWord();
    startTimer();
}

// Liste des mots/phrases/paragraphe par niveau
function getWordList() {
    switch (currentLevel) {
        case 1: return words;
        case 2: return phrases;
        case 3: return paragraphs;
        default: return words;
    }
}

// Charger le prochain mot ou texte
function loadNextWord() {
    const wordList = getWordList();
    if (totalWords >= wordList.length) {
        endGame();
        return;
    }

    document.getElementById('word-display').innerText = wordList[totalWords];
    document.getElementById('input-box').value = '';
    document.getElementById('input-box').focus();
}

// Timer de jeu
function startTimer() {
    interval = setInterval(() => {
        time--;
        document.getElementById('timer').innerText = time;
        updateProgressBar();

        if (time <= 0) {
            clearInterval(interval);
            validateAnswer();
        }
    }, 1000);
}

// Mettre à jour la barre de progression
function updateProgressBar() {
    progress = (30 - time) / 30 * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Validation de la réponse
document.getElementById('validate-btn').addEventListener('click', validateAnswer);

function validateAnswer() {
    const input = document.getElementById('input-box').value.trim();
    const currentWord = getWordList()[totalWords];

    if (input === currentWord) {
        score++;
    }
    totalWords++;
    document.getElementById('score').innerText = score;

    loadNextWord();
}

// Fin du jeu
function endGame() {
    const accuracy = (score / totalWords) * 100;
    const message = accuracy >= 85 ? "Félicitations ! Vous avez réussi à passer au niveau suivant." : "Dommage ! Essayez encore.";

    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('result-message').innerText = `Score final : ${score} sur ${totalWords} mots. Précision : ${accuracy.toFixed(2)}%. ${message}`;
}

// Réinitialiser le jeu
function resetGame() {
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('level-select').classList.remove('hidden');
}