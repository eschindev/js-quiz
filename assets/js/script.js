// declaring all variables to ensure availability
var timeLeft;
var initialsScore;
var timer;
var quizArea;
var startScreen;
var endScreen;
var hsButton;
var hsScreen;
var playAgainButton;
var startButton;
var quizContent;
var currentQuestion;
var question1;
var question2;
var question3;
var question4;
var question5;
var question;
var answer1;
var answer2;
var answer3;
var answer4;
var finalScore;
var quizScore;
var hsTable;
var isCorrect;
var clearHsButton;

// correlates variables to HTML elements and adds event listeners after HTML has finished loading
window.onload = function() {
    hsButton = document.getElementById("hs-button");
    hsButton.addEventListener("click", quiz.showHS);
    timer = document.getElementById("timer");
    quizArea = document.getElementById("quiz-area");
    startScreen = document.getElementById("start-screen");
    endScreen = document.getElementById("end-screen");
    hsScreen = document.getElementById("hs-screen");
    playAgainButton = document.getElementById("play-again-button");
    playAgainButton.addEventListener("click", quiz.startQuiz);
    startButton = document.getElementById("start-button");
    startButton.addEventListener("click", quiz.startQuiz);
    quizScore = document.getElementById("quiz-score");
    hsTable = document.getElementById("hs-table");
    question = document.getElementById("question");
    isCorrect = document.getElementById("is-correct");
    clearHsButton = document.getElementById("clear-hs-button");
    clearHsButton.addEventListener("click", quiz.clearHS)
    answer1 = document.getElementById("answer-button-1");
    answer1.addEventListener("click", function() {
        quiz.checkAnswer(parseInt(answer1.dataset.question))
    });
    answer2 = document.getElementById("answer-button-2");
    answer2.addEventListener("click", function() {
        quiz.checkAnswer(parseInt(answer2.dataset.question))
    });
    answer3 = document.getElementById("answer-button-3");
    answer3.addEventListener("click", function() {
        quiz.checkAnswer(parseInt(answer3.dataset.question))
    });
    answer4 = document.getElementById("answer-button-4");
    answer4.addEventListener("click", function() {
        quiz.checkAnswer(parseInt(answer4.dataset.question))
    });
    question1 = ["question1", "wrong1", "wrong2", "wrong3", "correctAnswer", "correctAnswer"];
    question2 = ["question2", "wrong1", "correctAnswer", "wrong2", "wrong3", "correctAnswer"];
    question3 = ["question3", "correctAnswer", "wrong1", "wrong2", "wrong3", "correctAnswer"];
    question4 = ["question4", "wrong1", "wrong2", "correctAnswer", "wrong3", "correctAnswer"];
    question5 = ["question5", "wrong1", "wrong2", "wrong3", "correctAnswer", "correctAnswer"];
    quizContent = [question1, question2, question3, question4, question5];
    form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        initialsScore = {
            initials: document.getElementById("initials").value,
            score: finalScore
        }
        localStorage.setItem(Date.now().toString(), JSON.stringify(initialsScore));
        quiz.showHS();
    });
}

// quiz object holds all functions related to quiz functionality
var quiz = {
    // starts quiz by displaying the quiz screen, hiding other screens, setting relevant variables to initial values, and starting countdown
    startQuiz: function() {
        timeLeft = 60;
        finalScore = 0;
        countdown();
        startScreen.style.display = "none";
        endScreen.style.display = "none";
        hsScreen.style.display = "none";
        quizArea.style.display = "block";
        currentQuestion = 0;
        quiz.nextQuestion();
    },
    // checks the selected answer against the correct answer
    checkAnswer: function(a) {
        if (quizContent[currentQuestion][a] === quizContent[currentQuestion][5]) {
            quiz.correctAnswer();
        } else {
            quiz.wrongAnswer();
        }
    },
    // increments the current question when user gets the correct answer
    correctAnswer: function() {
        currentQuestion++;
        isCorrect.textContent = "Correct!"
        quiz.nextQuestion();
    },
    // increments the current question and removes 15s from the timer when user gets the incorrect answer
    wrongAnswer: function() {
        currentQuestion++;
        isCorrect.textContent = "Incorrect"
        timeLeft -= 15;
        if (timeLeft > 0) {
            quiz.nextQuestion();
        } else {
            quiz.endQuiz();
        }
    },
    // checks if the most recent question was the last one and ends quiz if so, otherwise, loads next question to quiz area
    nextQuestion: function() {
        if (quizContent[currentQuestion] === undefined) {
            quiz.endQuiz();
        } else {
            question.textContent = quizContent[currentQuestion][0];
            answer1.textContent = quizContent[currentQuestion][1];
            answer2.textContent = quizContent[currentQuestion][2];
            answer3.textContent = quizContent[currentQuestion][3];
            answer4.textContent = quizContent[currentQuestion][4];
        }
    },
    // displays the end screen and hides all others, terminates countdown if still in progress, and displays final score
    endQuiz: function() {
        startScreen.style.display = "none";
        quizArea.style.display = "none";
        hsScreen.style.display = "none";
        endScreen.style.display = "block";
        finalScore = timeLeft;
        if (timeLeft > 0) {
            timeLeft = -1;
        } else {
            finalScore = 0;
        }
        quizScore.textContent = finalScore;
    },
    // displays the HS screen and hides all others, loads HSs from localStorage into array, sorts array by descending score, adds values to table, displays table
    showHS: function() {
        startScreen.style.display = "none";
        quizArea.style.display = "none";
        endScreen.style.display = "none";
        hsScreen.style.display = "block";

        var highScoresArr = [];
        for (i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = JSON.parse(localStorage.getItem(key));
            highScoresArr.push([value.initials, parseInt(value.score)]);
        }
        highScoresArr.sort(function(a, b) {
            return b[1] - a[1];
        });
        for (i = hsTable.rows.length - 1; i > 0; i--) {
            hsTable.deleteRow(i);
        }
        for (let i = 0; i < highScoresArr.length; i++) {
            var row = document.createElement('tr');
            var initialsCell = document.createElement('td');
            var scoreCell = document.createElement('td');
          
            initialsCell.textContent = highScoresArr[i][0];
            scoreCell.textContent = highScoresArr[i][1];
          
            row.appendChild(initialsCell);
            row.appendChild(scoreCell);
            hsTable.appendChild(row);
        }
    },
    // clears all HSs from localStorage and refreshes HS table
    clearHS: function() {
        localStorage.clear();
        quiz.showHS();
    }
}

// manages the timer, and accounts for early termination when endQuiz sets timeLeft = -1
function countdown() {
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timer.textContent = timeLeft;
        timeLeft--;
      } else if (timeLeft === -1) {
        timer.textContent = ":^)";
        clearInterval(timeInterval);
      } else {
        quiz.endQuiz();
        timer.textContent = ":^(";
        clearInterval(timeInterval);
      }
    }, 1000);
}