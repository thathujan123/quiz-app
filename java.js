const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
    {
        question: 'what does css stand for?',
        answers: [
            { text: 'creative style sheets', correct: false },
            { text: 'cascading style sheets', correct: true },
            { text: 'colorful style sheets', correct: false },
            { text: 'cascading super sheets', correct: false }
        ]
    },
    {
        question: 'Which language runs in a web browser?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'C', correct: false },
            { text: 'Python', correct: false },
            { text: 'JavaScript', correct: true }
        ]
    },
    {
        question: 'Who is the CEO of Tesla?',
        answers: [
            { text: 'Jeff Bezos', correct: false },
            { text: 'Elon Musk', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Tony Stark', correct: false }
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'HyperText Markup Language', correct: true },
            { text: 'Home Tool Markup Language', correct: false },
            { text: 'Hyperlinks and Text Markup Language', correct: false },
            { text: 'None of the above', correct: false }
        ]
    }
];


startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});


restartButton.addEventListener('click', restartGame);

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove('hide');
    resultContainer.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}w

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainerElement.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.innerText = score;
    restartButton.classList.remove('hide');
    nextButton.classList.add('hide');
}

function restartGame() {
    restartButton.classList.add('hide');
    startGame();
}
