const startButton = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const submitButton = document.getElementById('submit-score');
const initialsInput = document.getElementById('initials');
const finalScoreElement = document.getElementById('final-score');

let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hyper Transfer Markup Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    correctAnswer: 0
  },
  // Add more questions here
];

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
