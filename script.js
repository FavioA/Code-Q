const startButton = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const submitButton = document.getElementById('submit-score');
const initialsInput = document.getElementById('initials');
const finalScoreElement = document.getElementById('final-score');
const highScoresList = document.getElementById('high-scores');

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
}

submitButton.addEventListener('click', () => {
  // Handle submitting the score, e.g., saving to localStorage
});

startButton.addEventListener('click', startQuiz);
