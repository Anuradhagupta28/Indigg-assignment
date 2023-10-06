


const questions = [
    {
        question: "1)What is the capital of France?",
        answers: ["Madrid", "Berlin", "Paris", "Rome"],
        correct: 2,
    },
    {
        question: "2)Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: 1,
    },
    {
        question: "3)What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1,
    },
    {
        question: "4)Which gas do plants absorb from the atmosphere?",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1,
    },
    {
        question: "5)What is the largest mammal in the world?",
        answers: ["Giraffe", "Elephant", "Blue Whale", "Lion"],
        correct: 2,
    },
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerElements = document.querySelectorAll("label span");
const answerdiv=document.getElementById("answer")
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const scoreCount = document.getElementById("score-count");

function loadQuestion() {
    const current = questions[currentQuestion];
    questionText.textContent = current.question;
    current.answers.forEach((answer, index) => {
        answerElements[index].textContent = answer;
    });
}



function finishQuiz() {
    questionText.textContent = "Quiz completed!";
    answerElements.forEach((answer) => (answer.textContent = ""));
    submitButton.style.display = "none";
    nextButton.style.display = "none";
    // answerdiv.style.display = "none";

    scoreCount.textContent = score + " out of " + questions.length;
    scoreCount.style.display = "block";

    // Create the "Restart Quiz" button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.id = "restart-btn";
    restartButton.addEventListener("click", restartQuiz); // Add this line to restart the quiz
    questionText.appendChild(restartButton);
}


loadQuestion();

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", loadNextQuestion);

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const selectedAnswerIndex = parseInt(selectedAnswer.value);
        if (selectedAnswerIndex === questions[currentQuestion].correct) {
            // The selected answer is correct.
            score++;
            selectedAnswer.parentElement.classList.add("correct");
        } else {
            // The selected answer is incorrect.
            selectedAnswer.parentElement.classList.add("incorrect");
        }
        // Disable further answer selection.
        answerElements.forEach((element) => {
            element.previousElementSibling.disabled = true;
        });
        if (currentQuestion < questions.length - 1) {
            submitButton.style.display = "none";
            nextButton.style.display = "block";
        } else {
            finishQuiz();
        }
    }
}

function loadNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        resetAnswerSelection();
        submitButton.style.display = "block";
        nextButton.style.display = "none";
    } else {
        finishQuiz();
    }
}

function resetAnswerSelection() {
    answerElements.forEach((element) => {
        element.previousElementSibling.checked = false;
        element.parentElement.classList.remove("correct", "incorrect");
        element.previousElementSibling.disabled = false;
    });
}





function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    resetAnswerSelection();
    // loadNextQuestion();
    // checkAnswer();
    submitButton.style.display = "block";
    nextButton.style.display = "none";
    hideScore();

    // // Remove the "Restart Quiz" button
    // const restartButton = document.getElementById("restart-btn");
    // restartButton.parentNode.removeChild(restartButton);

    // // Show the submit button
    // submitButton.style.display = "block";
    // nextButton.style.display = "none";
}

function hideScore() {
    
    scoreCount.style.display = "none";
}





