
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}

function startGame(level) {
    if (level > 1 && !completedLevels[level - 1]) {
        showModal(`Niveau ${level - 1} requis`, `Veuillez compléter le niveau ${level - 1} avant de continuer.`, false);
        return;
    }

    currentLevel = level;
    score = 0;
    totalWords = 0;
    time = currentTimeForLevel[level];  // Réinitialiser le temps du niveau actuel
    document.getElementById('score').innerText = score;

    document.getElementById('level-select').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('level-title').innerText = `Niveau ${level}`;

    loadNextWord();
    startTimer();
}

function loadNextWord() {
    const wordList = currentLevel === 1 ? words : currentLevel === 2 ? phrases : paragraphs;
    shuffleArray(wordList);  // Mélanger la liste à chaque tour

    if (totalWords >= wordList.length) {
        endGame();  // Si tous les mots sont terminés avant la fin du temps
        return;
    }

    document.getElementById('word-display').innerText = wordList[totalWords];
    document.getElementById('input-box').value = '';
    document.getElementById('input-box').focus();
}

function startTimer() {
    interval = setInterval(() => {
        time--;
        document.getElementById('timer').innerText = time;

        // Mise à jour de la barre de progression
        const progress = (currentTimeForLevel[currentLevel] - time) / currentTimeForLevel[currentLevel] * 100;
        document.getElementById('progress-bar').style.width = progress + '%';

        if (time <= 0 || totalWords >= (currentLevel === 1 ? words.length : currentLevel === 2 ? phrases.length : paragraphs.length)) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

function validateAnswer() {
    const input = document.getElementById('input-box').value.trim();
    const wordList = currentLevel === 1 ? words : currentLevel === 2 ? phrases : paragraphs;
    const currentWord = wordList[totalWords];

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
    returnButton.classList.toggle('hidden', currentLevel < 3);  // Le bouton Retour n'apparait qu'après le dernier niveau
    replayButton.classList.remove('hidden');

    const message = `Score final : ${score}/${totalWords}<br>Précision : ${accuracy.toFixed(2)}%`;

    // Appréciation basée sur la précision
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
    // Masquer la modale avant de commencer le niveau suivant
    document.getElementById('result-modal').style.display = 'none';

    if (currentLevel < 3) {
        completedLevels[currentLevel] = true;
        startGame(currentLevel + 1);
    } else {
        // Si c'est le dernier niveau, afficher un message de partage
        showModal('Félicitations !', 'Vous avez terminé le jeu ! Partagez-le avec vos amis.', true);
    }
}

function returnToHome() {
    document.getElementById('result-modal').style.display = 'none';
    document.getElementById('level-select').classList.remove('hidden');
}

function resetGame() {
    // Réinitialiser les valeurs sans changer de niveau
    score = 0;
    totalWords = 0;
    time = currentTimeForLevel[currentLevel]; // Conserver le temps du niveau actuel
    document.getElementById('score').innerText = score;

    document.getElementById('result-modal').style.display = 'none';  // Masquer la modale
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

// Ajout de l'événement sur le bouton Valider
document.getElementById('validate-btn').addEventListener('click', validateAnswer);

