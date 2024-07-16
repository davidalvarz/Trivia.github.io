const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const scoreContainerElement = document.getElementById('score-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: '¿Cuál es la capital de Francia?',
        answers: [
            { text: 'París', correct: true },
            { text: 'Madrid', correct: false },
            { text: 'Londres', correct: false },
            { text: 'Berlín', correct: false }
        ]
    },
    {
        question: '¿Cuál es el planeta más cercano al sol?',
        answers: [
            { text: 'Mercurio', correct: true },
            { text: 'Venus', correct: false },
            { text: 'Tierra', correct: false },
            { text: 'Marte', correct: false }
        ]
    },
    {
        question: '¿Quién escribió "Cien años de soledad"?',
        answers: [
            { text: 'Gabriel García Márquez', correct: true },
            { text: 'Mario Vargas Llosa', correct: false },
            { text: 'Jorge Luis Borges', correct: false },
            { text: 'Carlos Fuentes', correct: false }
        ]
    },
    {
        question: '¿Cuál es el río más largo del mundo?',
        answers: [
            { text: 'Amazonas', correct: true },
            { text: 'Nilo', correct: false },
            { text: 'Yangtsé', correct: false },
            { text: 'Misisipi', correct: false }
        ]
    },
    {
        question: '¿Cuál es el idioma más hablado del mundo?',
        answers: [
            { text: 'Mandarín', correct: true },
            { text: 'Inglés', correct: false },
            { text: 'Español', correct: false },
            { text: 'Hindú', correct: false }
        ]
    },
    {
        question: '¿Cuál es la montaña más alta del mundo?',
        answers: [
            { text: 'Everest', correct: true },
            { text: 'K2', correct: false },
            { text: 'Kangchenjunga', correct: false },
            { text: 'Lhotse', correct: false }
        ]
    },
    {
        question: '¿Qué elemento químico tiene el símbolo "O"?',
        answers: [
            { text: 'Oxígeno', correct: true },
            { text: 'Oro', correct: false },
            { text: 'Osmio', correct: false },
            { text: 'Ozono', correct: false }
        ]
    },
    {
        question: '¿En qué año llegó el hombre a la luna?',
        answers: [
            { text: '1969', correct: true },
            { text: '1970', correct: false },
            { text: '1968', correct: false },
            { text: '1971', correct: false }
        ]
    },
    {
        question: '¿Cuál es el océano más grande del mundo?',
        answers: [
            { text: 'Océano Pacífico', correct: true },
            { text: 'Océano Atlántico', correct: false },
            { text: 'Océano Índico', correct: false },
            { text: 'Océano Ártico', correct: false }
        ]
    },
    {
        question: '¿Quién pintó la "Mona Lisa"?',
        answers: [
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Miguel Ángel', correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    scoreContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
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
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setTimeout(() => setNextQuestion(), 1000);
    } else {
        setTimeout(() => showScore(), 1000);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScore() {
    questionContainerElement.classList.add('hide');
    scoreContainerElement.classList.remove('hide');
    scoreElement.innerText = `Tu puntuación es: ${score}/${questions.length}`;
    restartButton.classList.remove('hide');
}
