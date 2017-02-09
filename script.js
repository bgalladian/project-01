
//code was developed by myself, and various sources around the internet//

//quiz questions//
// great use of data structures and semantic variable / property naming to organize your questions
var allQuestions = [
    {
        question: "How many stars are on the flag?",
        choices: ["49", "51", "50", "52" ],
        correctAnswer: 2

    },
    {
        question: "What is the supreme law of the land?",
        choices: ["President", "Congress", "Constitution", "Supreme Court"],
        correctAnswer: 2
    },
    {
        question: "How long is one presidential term?(in years)",
        choices: ["4", "5", "7", "8"],
        correctAnswer: 0
    },
    {
        question: "What is the capital of the US?",
        choices: ["New York", "Washington, DC", "Philadelphia", "Boston"],
        correctAnswer: 1
    },
    {
        question: "Who was our First President?",
        choices: ["John Adams", "George Washington", "Thomas Jefferson", "Donald Trump"],
        correctAnswer: 1
    },
    {
        question: "When do we celebrate independence day?",
        choices: ["January 1st", "July 4th", "December 25th", "October 31st"],
        correctAnswer: 1
    },
    {
        question: "When was the constitution written?",
        choices: ["1776", "1812", "1982", "1787"],
        correctAnswer: 3
    },
    {
        question: "Who is our current president?",
        choices: ["Donald Trump", "Barrack Obama", "Bill Clinton", "George Bush"],
        correctAnswer: 0
    },
    {
      question: "What are the first 10 amendments called?",
      choices: ["The Top 10", "Bill of Rights", "Madisons Law", "Inalienable Rights"],
      correctAnswer: 1
    },
    {
      question: "Who is in charge of the executive branch?",
      choices: ["Congress", "Senate", "Speaker of the House", "President"],
      correctAnswer: 3
    }
];

//different variables//
var submitBtn = document.getElementById('myBtn');
var currentQuestion = 0;
var tally = 0;

var quizForm = document.getElementById('quiz');
var question;
var choices;
var radioButtons = document.getElementsByName('radioOption');
var index = 0;


//function to start quiz//
// maybe rename this function to something more semantic like 'showIntro'
function firstFunc() {
    if (currentQuestion === 0) {
        submitBtn.value = "Click Here to Start";
    }
// good job manipulating existing DOM elements instead of removing / replacing them
// (makes for DRYer code)
}

//function to ask the questions//
function askQuestion () {
    choices = allQuestions[currentQuestion].choices;
    question = allQuestions[currentQuestion].question;
    if (currentQuestion < allQuestions.length) {
        submitBtn.value = "Next";
        quizForm.innerHTML = "<h1>" + question + "</h1>";
        for (var i = 0; i < choices.length; i++) {
            quizForm.innerHTML += "<label><input type='radio' name='radioOption' value='" + choices[i] + "'/>" + choices[i] + "</label>";
        }
        if (currentQuestion == allQuestions.length - 1) {
            submitBtn.value = "Submit";
        } else if (currentQuestion > allQuestions.length - 1) {
            calcQuiz();
        }
    }
}

//function to check score/tally//
function lookForChecked() {
    if (radioButtons.length > 1) {
          var checked = false; // I don't think this variable is being used. Make sure to clean up your code of unused variables / functions before deploying
          for (var i = 0; i < radioButtons.length; i++) { // Good use of for loop to evaluate user selection via radio buttons
            var selection = radioButtons[i];
             if (selection.checked) {
                var index = [i];
                // If you wanted to make your code more modular, you could abstract some of this out into a checkAnswer() function
                if (i === allQuestions[currentQuestion].correctAnswer) {
                  tally++;
                  alert("That is correct");
                } else if (i !== allQuestions[currentQuestion].correctAnswer) { // if two conditionals are related, like here, use an 'else if' to have them run sequentially
                  alert("That is incorrect");
                }
                // Same here, could be abstracted into a checkForCompletion() function to make your code more modular
                if (currentQuestion < allQuestions.length -1) {
                    currentQuestion++;
                } else {
                    alert('End of quiz');
                    calcQuiz(); // Good modularization here
                   return false; // Is this boolean return value being used? If not, remove it
                }
            }
        }
        if ($('input[name="radioOption"]:checked').length < 1) { // GREAT use of advanced CSS selectors to evaluate whether a radio button is checked or not
            alert('Please Make a Selection');
        }
    }
    askQuestion(); // Good modularization by separating this functionality into a separate function that can be reused and called when needed, like here
}


//function to notify and calculate total//
function calcQuiz() {
    quizForm.innerHTML = "<h1>You have finished the quiz</h1><p class='total'>You scored a total of " + tally + " out of " + allQuestions.length + "</h1>";
    submitBtn.remove();
}

//to load and listen for button click//
window.onload = firstFunc(); // Great example here of ensuring the whole DOM is loaded before triggering functionaltiy
submitBtn.addEventListener('click', lookForChecked);
