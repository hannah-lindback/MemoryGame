const emojis = ["🐸","🐸","😻","😻","🦄","🦄","🫎","🫎","🐮","🐮","🐢","🐢","🐣","🐣","🐻","🐻"];
var lives = 6;
var score = 0;

document.addEventListener('DOMContentLoaded', function() {
    displayHighScores();
}); 

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highscoreList = document.querySelector('.highscore-list');
    highscoreList.innerHTML = ''; // Clear existing list items
    highScores.forEach(score => {
        const scoreElement = document.createElement('li');
        scoreElement.textContent = `${score.name}: ${score.score}`;
        highscoreList.appendChild(scoreElement);
    });
}

document.getElementById('start-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const playerName = document.getElementById('name').value;

    localStorage.setItem('playerName', playerName);
    
    

    document.querySelector('.game').style.display = "flex"; 
    document.querySelector('.name').style.display = "none";
    document.querySelector('.start-game').style.display = "none";
});


function saveHighScore() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const playerName = localStorage.getItem('playerName');
    const newScore = { name: playerName, score: score };

    // Check if the player already exists in the high scores
    const existingPlayerIndex = highScores.findIndex(score => score.name === playerName);

    if (existingPlayerIndex !== -1) {
        // Update the existing player's score if the new score is higher
        if (highScores[existingPlayerIndex].score < score) {
            highScores[existingPlayerIndex].score = score;
        }
    } else {
        // Add the new score if the player does not exist
        highScores.push(newScore);
    }

    highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
    highScores.splice(5); // Keep only the top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highscoreList = document.querySelector('.highscore-list');
    highscoreList.innerHTML = ''; // Clear existing list items
    highScores.forEach(score => {
        const scoreElement = document.createElement('li');
        scoreElement.textContent = `${score.name}: ${score.score}`;
        highscoreList.appendChild(scoreElement);
    });
}


function updateScore(points) {
    score += points;
    document.querySelector('.score').innerHTML = score;
}

function updateLives() {
    lives -= 1;
    let livesDisplay = "❤️".repeat(lives);
    document.querySelector('.lives').innerHTML = livesDisplay;

    if (lives <= 0) {
        saveHighScore();
        document.querySelector('.game').innerHTML = "Game Over";
        document.querySelector('.game').style.fontSize = "80px";
        document.querySelector('.game').style.height = "100px";
        document.querySelector('.game').style.textAlign = "center";
        document.querySelector('.game').style.color = "red";
        document.querySelector('.game').style.display = "inline";
        document.querySelector('.game').style.justifyContent= "center";
        document.querySelector('.game').style.alignItems = "center";
        document.querySelector('.start-game').style.display = "none";
        document.querySelector('.try-again').style.display = "inline";
        

        displayHighScores();

}

    if (lives > 0 && score == 700) {
        saveHighScore();
        document.querySelector('.game').innerHTML = "You Win!";
        document.querySelector('.game').style.fontSize = "80px";
        document.querySelector('.game').style.height = "100px";
        document.querySelector('.game').style.textAlign = "center";
        document.querySelector('.game').style.color = "green";
        document.querySelector('.game').style.display = "inline";
        document.querySelector('.game').style.justifyContent= "center";
        document.querySelector('.game').style.alignItems = "center";
        document.querySelector('.reset').innerHTML = "Play Again";

        displayHighScores();
    }
}

var shuffle_emojis = emojis.sort(() => (Math.random() > .5) ? 2 : -1);

for ( var i = 0; i<emojis.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffle_emojis[i];

    box.onclick = function(){
        this.classList.add("flipped")

        setTimeout(function(){
            if (document.querySelectorAll('.flipped').length > 1) {
                if (document.querySelectorAll('.flipped')[0].innerHTML == document.querySelectorAll('.flipped')[1].innerHTML){
                    document.querySelectorAll('.flipped')[0].classList.add('flipMatch');
                    document.querySelectorAll('.flipped')[1].classList.add('flipMatch');
                    score += 100;
                    document.querySelector('.score').innerHTML = score;
        
                    document.querySelectorAll('.flipped').forEach(el => el.classList.remove('flipped'));
                    
        
                    if (document.querySelectorAll('.flipMatch').length == emojis.length) {
                        alert('You win');
                    }
                } else {
                    document.querySelectorAll('.flipped').forEach(el => el.classList.remove('flipped'));
                    updateLives();
                }
            }
        }, 500);
        

    }
    document.querySelector('.game').appendChild(box);
}