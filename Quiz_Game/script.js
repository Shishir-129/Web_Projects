// DOM Elements
const startScreen = document.getElementById("start-screen"); 
//here startScreen now points to the element of the HTML file(document) that has the id "start-screen"
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of Nepal?",
    answers: [
      { text: "Pokhara", correct: false },
      { text: "Biratnagar", correct: false },
      { text: "Kathmandu", correct: true },
      { text: "Lalitpur", correct: false },
    ],
  },
  {
    question: "Who was the first President of the USA?",
    answers: [
      { text: "Abraham Lincoln", correct: false },
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "John Adams", correct: false },
    ],
  },
  {
    question: "Which company created the PlayStation?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Nintendo", correct: false },
      { text: "Sony", correct: true },
      { text: "Sega", correct: false },
    ],
  },
  {
    question: "Who is the head of government in Nepal?",
    answers: [
      { text: "King", correct: false },
      { text: "President", correct: false },
      { text: "Prime Minister", correct: true },
      { text: "Chief Minister", correct: false },
    ],
  },
  {
    question: "Mario is a character of which company?",
    answers: [
      { text: "Sega", correct: false },
      { text: "Nintendo", correct: true },
      { text: "Sony", correct: false },
      { text: "EA", correct: false },
    ],
  },
  {
    question: "The Sun is a ",
    answers: [
      { text: "Planet", correct: false },
      { text: "Asteroid", correct: false },
      { text: "Star", correct: true },
      { text: "Comet", correct: false },
    ],
  },
  {
    question: "Which country has the longest coastline?",
    answers: [
      { text: "USA", correct: false },
      { text: "Australia", correct: false },
      { text: "Canada", correct: true },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "Which game popularized the battle royale genre?",
    answers: [
      { text: "Fortnite", correct: false },
      { text: "PUBG", correct: true },
      { text: "Apex Legends", correct: false },
      { text: "Warzone", correct: false },
    ],
  },
  {
    question: "What is the name of NASA's famous space telescope?",
    answers: [
      { text: "Kepler", correct: false },
      { text: "Hubble", correct: true },
      { text: "Voyager", correct: false },
      { text: "Orion", correct: false },
    ],
  },
   {
    question: "Mount Everest lies on the border of Nepal and which country?",
    answers: [
      { text: "India", correct: false },
      { text: "Bhutan", correct: false },
      { text: "China", correct: true },
      { text: "Pakistan", correct: false },
    ],
  },
  {
    question: "Which planet has the most moons?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Venus", correct: false },
    ],
  },
];

//QUIZ State Vars

//All three variables use 'let' because their values are expected to change as the user progresses through the quiz.
// currentQuestionIndex will increase (e.g., $0 \to 1 \to 2$).
// score will increase (e.g., $0 \to 1 \to 2$).
// answersDisabled will toggle between true and false.

let currentQuestionIndex= 0;  //Tracks the current question.
let score = 0;                //Tracks the user's points.
let answersDisabled = false;  //Controls user interaction.
//  This is a flag (a simple on/off switch) used to prevent 
// the user from clicking or changing answers after they have submitted a choice for the current question.

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars
    currentQuestionIndex=0;
    score=0;
    scoreSpan.textContent=score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1; //index starts from 0

    const progressPercent = (currentQuestionIndex)/quizQuestions.length * 100;
    progressBar.style.width = progressPercent + "%";  // eg: 50 + % = 50%

    questionText.textContent = currentQuestion.question;

    //whenever we show questions, get rid of previous questions from coming into the UI.
    answersContainer.innerHTML = "";

    //create a button for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // dataset is the property of the button element that allows us to store custom data
        button.dataset.correct = answer.correct;

        button.addEventListener("click",selectAnswer);

        //show the buttons in the website
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    if(answersDisabled==true) return; // don't do anything in this case , just lock  

    answersDisabled = true;

    // for checking if the selected button is true or not
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    //for storing/getting feedback after selecting each button.
     // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array,
     //  this is because the NodeList is not an array and we need to use the forEach method
    Array.from(answersContainer.children).forEach((button) => {
        if(button.dataset.correct === "true") { // triple = checks both value and dataType : strict check
            button.classList.add("correct");
        }else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    //increment score for every correct answer
    if(isCorrect){
        score++;
        scoreSpan.textContent =score;
    }

    //after selecting every answer , pause for a certain time , lets say 1sec (1000ms)
    setTimeout(() => {
        currentQuestionIndex++;

        //check if there are more questions or its over
        if(currentQuestionIndex<=quizQuestions.length-1){
            showQuestion();
        }else{
            showResults();
        }
    },700);
}

function showResults(){
    //hide quiz screen and show the result screen
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length)*100;

    if(percentage === 100){
        resultMessage.textContent = "You have carved victory into fate itself.";
    }else if(percentage >= 80){
        resultMessage.textContent = "Strong… but strength still has room to grow.";
    }else if(percentage >= 60){
        resultMessage.textContent = "You stand, but on unsteady ground.";
    }else if(percentage >= 40){
        resultMessage.textContent = "You survived… that is all.";
    }else{
        resultMessage.textContent = "You were not ready. Return when you are.";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}