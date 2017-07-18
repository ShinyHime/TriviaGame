// INITIALIZE VARIABLES
// trivia variables
var questions = ["What do you play as?",
                "Who is/are the inklings' enemies?",
                "Who are the members of the Squid Sisters?",
                "What is Marina?"];
var answers = [
                ["Octarians", "Octolings", "Inklings", "Squid Kids"],
                ["Octarians", "Callie and Marie", "Captain Cuttlefish", "Pearl"],
                ["Marina and Pearl", "Judd and Judd Jr.", "Callie and Marie", "Crusty Sean and Flow"],
                ["An Octoling", "An Inkling", "A Squid Kid", "A Cat"]
            ]
var correctAnswer = ["Inklings", "Octarians", "Callie and Marie", "An Octoling"];
var selectedAnswer;

var countdown = 30;
var theClock;
var questionNum = 0;
var correctCount = 0;
var incorrectCount = 0;


function game() {
  $("#questions").html("<h2>" + questions[questionNum] + "</h2>");

  $("#answers").html("<p class='ans'>" + answers[questionNum][0] + "</p>" +
                     "<p class='ans'>" + answers[questionNum][1] + "</p>" +
                     "<p class='ans'>" + answers[questionNum][2] + "</p>" +
                     "<p class='ans'>" + answers[questionNum][3] + "</p>"
                    )

}

function wait() {
  if (questionNum < 3) {
	questionNum++;
	game();
	countdown = 30;
	timer();
	}
	else {
		finalScreen();
	}
}

function correct() {
  correctCount++;
  $("#answers").html("<h3>Correct! The answer is " + correctAnswer[questionNum] + "!</h3>");
  setTimeout(wait, 1000*3);

}

function loss() {
  incorrectCount++;
  $("#answers").html("<h3>Wrong! The answer is " + correctAnswer[questionNum] + "!</h3>");
  setTimeout(wait, 1000*3);

}

function timedOut() {
  incorrectCount++;
  $("#answers").html("<h3>Timed Out! The answer is " + correctAnswer[questionNum] + "!</h3>");
  setTimeout(wait, 1000*10);

}


function finalScreen() {
  $("#timer").empty();
  $("#questions").html("<h2>Results</h2>");
  $("#answers").html("<h3>Number Correct: " + correctCount + "</h3>" +
                     "<h3>Number Wrong: " + incorrectCount + "</h3>" +
                     "<a class='reset-button' href='#' role='button'>Reset The Quiz!</a></p>"
                    );

}

function resetGame() {
	questionNum = 0;
	correctCount = 0;
	incorrectCount = 0;
	countdown = 30;
	game();
	timer();
}

//CLICK EVENTS
$("body").on("click", ".ans", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswer[questionNum]) {

    // alert("correct");

		clearInterval(theClock);
		correct();
	}
	else {

    // alert("wrong answer!");

    clearInterval(theClock);
		loss();
	}
});

$("body").on("click", ".reset-button", function(event){
	resetGame();
});

//TIME || CLOCK
function timer() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (countdown === 0) {
			clearInterval(theClock);
			timedOut();
		}
		if (countdown > 0) {
			countdown--;
		}
		$("#timer").html(countdown);
	}
}

game();
timer();
