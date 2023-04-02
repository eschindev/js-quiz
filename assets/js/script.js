
var timeLeft;
var timer;
var quizArea;
var startScreen;
var endScreen;
var hsScreen;
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

window.onload = function() {
    var timeLeft;
    var timer = document.getElementById("timer");
    var quizArea = document.getElementById("quiz-area");
    var startScreen = document.getElementById("start-screen");
    var endScreen = document.getElementById("end-screen");
    var hsScreen = document.getElementById("hs-screen");
    var startButton = document.getElementById("start-button");
    startButton.addEventListener("click", quiz.startQuiz);
    var question = document.getElementById("question");
    var answer1 = document.getElementById("answer-button-1");
    answer1.addEventListener("click", function() {
        quiz.checkAnswer(parseInt(answer1.dataset.question))
    });
    var answer2 = document.getElementById("answer-button-2");
    answer2.addEventListener("click", function() {
        quiz.checkAnswer(parseInt(answer2.dataset.question))
    });
    var answer3 = document.getElementById("answer-button-3");
    answer3.addEventListener("click", function() {
        quiz.checkAnswer(parseInt(answer3.dataset.question))
    });
    var answer4 = document.getElementById("answer-button-4");
    answer4.addEventListener("click", function() {
        quiz.checkAnswer(parseInt(answer4.dataset.question))
    });
    var question1 = ["question1", "wrong1", "wrong2", "wrong3", "correctAnswer", "correctAnswer"];
    var question2 = ["question2", "wrong1", "wrong2", "wrong3", "correctAnswer", "correctAnswer"];
    var question3 = ["question3", "wrong1", "wrong2", "wrong3", "correctAnswer", "correctAnswer"];
    var question4 = ["question4", "wrong1", "wrong2", "wrong3", "correctAnswer", "correctAnswer"];
    var question5 = ["question5", "wrong1", "wrong2", "wrong3", "correctAnswer", "correctAnswer"];
    var quizContent = [question1, question2, question3, question4, question5];
    var form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Your code here
    });
}

var quiz = {
    startQuiz: function() {
        console.log("startGame ran");
        timeLeft = 60;
        startScreen.style.display = "none";
        endScreen.style.display = "none";
        hsScreen.style.display = "none";
        quizArea.style.display = "block";
        currentQuestion = 0;
        quiz.nextQuestion();
    },
    checkAnswer: function(a) {
        console.log("checkAnswer");
        console.log(a)
        if (quizContent[currentQuestion][a] === quizContent[currentQuestion][5]) {
            console.log("correct!");
            quiz.correctAnswer();
        } else {
            console.log("incorrect")
            quiz.wrongAnswer();
        }
    },
    correctAnswer: function() {
        currentQuestion++;
        quiz.nextQuestion();
    },
    wrongAnswer: function() {
        currentQuestion++;
        quiz.nextQuestion();
    },
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
    endQuiz: function() {
        startScreen.style.display = "none";
        quizArea.style.display = "none";
        hsScreen.style.display = "none";
        endScreen.style.display = "block";
    },
    showHS: function() {
        startScreen.style.display = "none";
        quizArea.style.display = "none";
        endScreen.style.display = "none";
        hsScreen.style.display = "block";
    }

}


function countdown() {
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timer.textContent = timeLeft;
        timeLeft--;
      } else if (timeLeft === -1) {
        timer.textContent = ":^)";
        clearInterval(timeInterval);
      } else {
        game.loseGame();
        timer.textContent = ":^(";
        clearInterval(timeInterval);
      }
    }, 1000);
}
