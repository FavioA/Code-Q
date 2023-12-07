const startButton = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const timerElement = document.getElementById('timer');
const submitButton = document.getElementById('submit-score');
const clearScoresButton = document.getElementById('clear-scores'); // Added line
const initialsInput = document.getElementById('initials');
const finalScoreElement = document.getElementById('final-score');
const highScoresList = document.getElementById('final-score'); // Updated line

let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hyper Transfer Markup Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    correctAnswer: 0
  },
  {
    question: "Which of the following is NOT a programming language?",
    options: ["JavaScript", "Python", "CSS", "HTML"],
    correctAnswer: 2
  },
  {
    question: "What is the purpose of the 'console.log()' function in JavaScript?",
    options: ["Display a message on the web page", "Print messages to the browser console", "Create a log file on the server", "None of the above"],
    correctAnswer: 1
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: ["let myVar;", "variable myVar;", "v myVar;", "var myVar;"],
    correctAnswer: 3
  },
  {
    question: "What is the result of the expression '5 + '5' in JavaScript?",
    options: ["10", "55", "Error", "undefined"],
    correctAnswer: 1
  },
  // Add more questions here
];

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function startQuiz() {
  startButton.style.display = 'none';
  quizScreen.style.display = 'block';
  updateTimerDisplay();
  timer = setInterval(updateTimer, 1000);
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = `${index + 1}. ${option}`;
    button.addEventListener('click', () => checkAnswer(index));
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(userAnswerIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (userAnswerIndex === currentQuestion.correctAnswer) {
    // Correct answer
  } else {
    // Incorrect answer, subtract time
    timeLeft -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  quizScreen.style.display = 'none';
  endScreen.style.display = 'block';
  finalScoreElement.textContent = timeLeft;
}

function updateTimer() {
  timeLeft--;

  if (timeLeft <= 0) {
    endQuiz();
  }

  updateTimerDisplay();
}

function updateTimerDisplay() {
  timerElement.textContent = `Time: ${timeLeft}s`;
}

function submitScore() {
  const initials = initialsInput.value.trim();

  if (initials !== '') {
    const score = {
      initials: initials,
      score: timeLeft
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Keep only the top 5 scores

    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
  }
}

function displayHighScores() {
  highScoresList.innerHTML = '';

  highScores.forEach((score, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
    highScoresList.appendChild(listItem);
  });
}

function clearHighScores() {
  highScores.length = 0; // Clear the highScores array
  localStorage.removeItem('highScores'); // Remove highScores from local storage
  displayHighScores(); // Refresh the high scores display
}

submitButton.addEventListener('click', submitScore);
clearScoresButton.addEventListener('click', clearHighScores); // Added line
startButton.addEventListener('click', startQuiz);


