let currentLevel = 1;
let completedLevels = { 1: false, 2: false, 3: false };
let words = ["chat", "chien", "soleil", "ordinateur", "livre", "papillon", "maison", "voiture", "plage", "ciel", "nuage", "arbre"];
let phrases = ["Le soleil brille", "Un chat joue dans le jardin", "Un ordinateur puissant", "La pluie tombe", "Un oiseau chante"];
let paragraphs = ["La vie est belle quand on apprend à taper rapidement sur un clavier. C'est un excellent moyen de s'améliorer et de renforcer sa concentration.",
                  "Apprendre à taper vite n'est pas seulement utile pour la productivité, mais aussi pour s'amuser en jouant à des jeux de type rapide sur des claviers modernes."];
let score = 0;
let totalWords = 0;
let time = 60;
let interval;
let currentTimeForLevel = {1: 60, 2: 50, 3: 40};  // Garder le temps par niveau

// Copies de listes pour utilisation unique des mots
let wordsCopy = ["chat", "chien", "soleil", "ordinateur", "livre", "papillon", "maison", "voiture", "plage", "ciel", "nuage", "arbre"];
let phrasesCopy = ["Le soleil brille", "Un chat joue dans le jardin", "Un ordinateur puissant", "La pluie tombe", "Un oiseau chante"];
let paragraphsCopy = ["La vie est belle quand on apprend à taper rapidement sur un clavier. C'est un excellent moyen de s'améliorer et de renforcer sa concentration.",
                  "Apprendre à taper vite n'est pas seulement utile pour la productivité, mais aussi pour s'amuser en jouant à des jeux de type rapide sur des claviers modernes."];

// Total des mots, phrases et paragraphes
let totalPossibleWords = {
    1: words.length,
    2: phrases.length,
    3: paragraphs.length
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}

function shuffleAndResetLists() {
    wordsCopy = ["chat", "chien", "soleil", "ordinateur", "livre", "papillon", "maison", "voiture", "plage", "ciel", "nuage", "arbre"];
    phrasesCopy = ["Le soleil brille", "Un chat joue dans le jardin", "Un ordinateur puissant", "La pluie tombe", "Un oiseau chante"];
    paragraphsCopy = ["La vie est belle quand on apprend à taper rapidement sur un clavier. C'est un excellent moyen de s'améliorer et de renforcer sa concentration.",
                  "Apprendre à taper vite n'est pas seulement utile pour la productivité, mais aussi pour s'amuser en jouant à des jeux de type rapide sur des claviers modernes."];
    shuffleArray(wordsCopy);
    shuffleArray(phrasesCopy);
    shuffleArray(paragraphsCopy);
}

function startGame(level) {
    if (level > 1 && !completedLevels[level - 1]) {
        showModal(`Niveau ${level - 1} requis`, `Veuillez compléter le niveau ${level - 1} avant de continuer.`, false);
        return;
    }

    currentLevel = level;
    score = 0;
    totalWords = 0;
    time = currentTimeForLevel[level];  
    shuffleAndResetLists();  // Mélanger et réinitialiser les listes à chaque début de niveau
    document.getElementById('score').innerText = score;
    document.getElementById('level-select').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('level-title').innerText = `Niveau ${level}`;

    loadNextWord();
    startTimer();
}

function loadNextWord() {
    const wordList = currentLevel === 1 ? wordsCopy : currentLevel === 2 ? phrasesCopy : paragraphsCopy;

    if (wordList.length === 0) {
        endGame(); 
        return;
    }

    const nextWord = wordList.pop();  // Retirer le dernier mot pour éviter les répétitions
    document.getElementById('word-display').innerText = nextWord;
    document.getElementById('input-box').value = '';
    document.getElementById('input-box').focus();
}

function startTimer() {
    interval = setInterval(() => {
        time--;
        document.getElementById('timer').innerText = time;

        const progress = (currentTimeForLevel[currentLevel] - time) / currentTimeForLevel[currentLevel] * 100;
        document.getElementById('progress-bar').style.width = progress + '%';

        if (time <= 0 || (currentLevel === 1 && wordsCopy.length === 0) || (currentLevel === 2 && phrasesCopy.length === 0) || (currentLevel === 3 && paragraphsCopy.length === 0)) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

function validateAnswer() {
    const input = document.getElementById('input-box').value.trim();
    const currentWord = document.getElementById('word-display').innerText;

    if (input === currentWord) score++;
    totalWords++;
    document.getElementById('score').innerText = score;
    loadNextWord();
}

function endGame() {
    const accuracy = (score / totalWords) * 100;
    const isLevelPassed = accuracy >= 85;

    const nextButton = document.getElementById('next-level-btn');
    const replayButton = document.getElementById('replay-btn');
    const returnButton = document.getElementById('return-btn');

    nextButton.classList.toggle('hidden', !isLevelPassed);
    returnButton.classList.toggle('hidden', currentLevel < 3); 
    replayButton.classList.remove('hidden');

    // Calculer le nombre total d'éléments pour le niveau actuel
    const totalElementsForLevel = totalPossibleWords[currentLevel];
    const message = `Score final : ${score}/${totalElementsForLevel}<br>Précision : ${accuracy.toFixed(2)}%`;

    let appreciation = '';
    if (accuracy >= 90) {
        appreciation = "Bravo, excellent travail!";
    } else if (accuracy >= 75) {
        appreciation = "Bien joué, mais il y a encore un peu à améliorer!";
    } else {
        appreciation = "Désolé, insuffisant. Continue à t'entraîner!";
    }

    showModal(isLevelPassed ? 'Félicitations' : 'Échec', `${message}<br><br>${appreciation}`, isLevelPassed);
}

function showModal(title, message, canProceed) {
    const modal = document.getElementById('result-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-message').innerHTML = message;
    document.getElementById('next-level-btn').classList.toggle('hidden', !canProceed);
    modal.style.display = 'flex';
}

function nextLevel() {
    document.getElementById('result-modal').style.display = 'none';

    if (currentLevel < 3) {
        completedLevels[currentLevel] = true;
        startGame(currentLevel + 1);
    } else {
        showModal('Félicitations !', 'Vous avez terminé le jeu ! Partagez-le avec vos amis.', true);
    }
}

function returnToHome() {
    document.getElementById('result-modal').style.display = 'none';
    document.getElementById('level-select').classList.remove('hidden');
}

function resetGame() {
    shuffleAndResetLists();
    score = 0;
    totalWords = 0;
    time = currentTimeForLevel[currentLevel]; 
    document.getElementById('score').innerText = score;
    document.getElementById('result-modal').style.display = 'none';  
    loadNextWord();
    startTimer();
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("J'ai terminé le jeu AZERTYPE ! Viens tester tes compétences de frappe : ");
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
}

function shareOnTelegram() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("J'ai terminé le jeu AZERTYPE ! Viens tester tes compétences de frappe : ");
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("J'ai terminé le jeu AZERTYPE ! Viens tester tes compétences de frappe : ");
    window.open(`https://twitter.com/intent/tweet?text=${text}${url}`, '_blank');
}

document.getElementById('validate-btn').addEventListener('click', validateAnswer);

function toggleTheme() {
    const body = document.getElementById('theme');
    body.classList.toggle('night-mode');
    body.classList.toggle('day-mode');
}
window.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    const gameContainer = document.querySelector('.container');
    const startButton = document.createElement('button');
    startButton.textContent = "Aller au jeu";
    startButton.className = "md:absolute px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800 right-5 md:top-[90%]";
    aboutSection.appendChild(startButton);

    startButton.addEventListener('click', () => {
        aboutSection.classList.add('hidden');
        gameContainer.classList.add('fade-in');
        gameContainer.classList.remove('hidden');
    });

    document.getElementById('input-box').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Empêche le comportement par défaut
            validateAnswer();    // Valide la réponse
        }
    });
});