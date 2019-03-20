var number = 15;
var intervalId;
var qCounter = 0
var correctCounter = 0;
var incorrectCounter = 0;
var noAnsCounter= 0;
var waitCounter = 0;
var timeUp = false;
var validAns = false;

// ----------> Question and Answer Defenition
var questionsArray = [
  "1. Who discovers America?",
  "2. In which year America is recogonized as a Country?",
  "3. Who was the first president of the United States?",
  "4. This president issued an order in 1863 which freed the slaves.",
  "5. Who invented the electric light bulb?",
  "6. Who wrote the Declaration of Independence?",
  "7. What is the smallest state by area in America?",
  "8. Who was the first man to walk on the moon?",
  "9.  What is the largest state by area in America?",
  "10. What is the capital of New Jersey?"
];
var answersArray = [
  ["Thomas Jefferson", "Chistopher Columbus", "George Washington", "Abraham Lincoln"],
  ["1492", "1788", "1777", "1898"],
  ["Thomas Jefferson" , "Abraham Lincoln", "George Washington", "Benjamin Franklin"],
  ["Thomas Jefferson" , "Abraham Lincoln", "George Washington", "Benjamin Franklin"],
  ["Shirley Temple", "Harry Ford", "Thomas Edison", "Andrew Jackson"],
  ["Thomas Paine", "Patrick Henry", "Ben Franklin", "Thomas Jefferson"],
  ["Rhode Island", "New Jersey", "Delaware", "Hawaii"],
  ["Joseph A. Flye", "James Crockett", "Thomas Stringfellow", "Neil Armstrong"],
  ["Texas", "Alaska", "California", "Montana"],
  ["Newark", "Trenton", "Metuchen", "Red Bank"]
];
var correctArray = [
  "Chistopher Columbus",
  "1777",
  "George Washington",
  "Abraham Lincoln",
  "Thomas Edison",
  "Thomas Jefferson",
  "Rhode Island",
  "Neil Armstrong",
  "Alaska",
  "Trenton"
];
var images = [
  "assets/images/columbus.jpg",
  "assets/images/1777.jpg",
  "assets/images/washington.jpeg",
  "assets/images/lincoln.jpeg",
  "assets/images/edison.jpg",
  "assets/images/jefferson.jpeg",
  "assets/images/RI.jpg",
  "assets/images/neil.jpeg",
  "assets/images/alaska.jpg",
  "assets/images/trenton.jpg"
]
// ----------> Question and Answer Defenition

$("#startButton").on("click", run);

function run() {
  // setTimeout(wait, 2500)
  $("#startButton").hide();
  // move();
  generateHTML(qCounter);
  intervalId = setInterval(decrement, 1000);

}
function decrement() {
  number--;
  $("#timerDiv").html("<h2 style='text-align:center; color: navy'> Time Remaining " + number + " Seconds</h2>");
  if (number === 0) {
    stop();
    timeUp = true;
    noAnswerTimeOut();
  }
}
function stop() {
  clearInterval(intervalId);
}


function generateHTML(qacounter) {
  // console.log("QACout: " +qacounter)
  // console.log(answersArray[1][0]);
  triviaDivHTML= "<h2 style='text-align:center; color: navy'> "+questionsArray[qacounter]+ "</h2> <br><button class='answer'>"+answersArray[qacounter][0]+"</button><button class='answer'>"+answersArray[qacounter][1]+"</button><button class='answer'>"+answersArray[qacounter][2]+"</button> <button class='answer'>"+answersArray[qacounter][3]+"</button>"
  $("#triviaDiv").html(triviaDivHTML);
  // qCounter++
}
// function nextQuestion() {
//   if (qCounter < 1){
//     setTimeout(console.log("waiting for next question"), 2500);
//     qCounter++
//   }
// }
function correcAnswer(){
  if(validAns){
    triviaDivHTML= "<h2 style='text-align:center; color: navy'> Correct! <br /> Answer is: <br /> "+ correctArray[qCounter] + "</h2><img src='"+images[qCounter]+"'>"
    $("#triviaDiv").html(triviaDivHTML);
    correctCounter++;
  } else {
    triviaDivHTML= "<h2 style='text-align:center; color: navy'> Sorry Wrong! <br /> Correct Answer is: <br />"+ correctArray[qCounter] + "</h2><img src='"+images[qCounter]+"'>"
    $("#triviaDiv").html(triviaDivHTML);
    incorrectCounter++;

  }
}
function noAnswerTimeOut(){
  if(timeUp){
    triviaDivHTML= "<h2 style='text-align:center; color: navy'> Time UP ! </h2>"
    $("#triviaDiv").html(triviaDivHTML);
    noAnsCounter++;
    stop();
    number=15;
    if (qCounter != questionsArray.length -1){
      qCounter++;
    } else {
      console.log("thats it end of quiz");
      displayScore();
      $("#restartGame").show();
      return false;
    }
    timeUp=false;
    validAns = false;
    $("#timerDiv").html("<h2 style='text-align:center; color: navy'> Time Remaining " + number + " Seconds</h2>");
    setTimeout(run, 3000);

  }
}
function displayScore() {
  triviaDivHTML= "<h2 style='text-align:center; color: navy'>Here is your Final Score: <br/>Correct Answers: "+correctCounter+"<br/>Wrong Answers: "+incorrectCounter+"<br/>Unanswered: "+noAnsCounter+" </h2>"
  $("#triviaDiv").html(triviaDivHTML);
}
// function move() {
//   console.log("running move");
//   $("#myBar").show();
//   var elem = document.getElementById("myBar");
//   var width = 15;
//   var id = setInterval(frame, 1000);
//   function frame() {
//     if (width <= 0) {
//       clearInterval(id);
//     } else {
//       width--;
//       elem.style.width = width + '%';
//       elem.innerHTML = width * 1  + 'secs';
//     }
//   }
// }

function restartGame(){
   number = 15;
   intervalId;
   qCounter = 0
   correctCounter = 0;
   incorrectCounter = 0;
   noAnsCounter= 0;
   waitCounter = 0;
   timeUp = false;
   validAns = false;
   $("#timerDiv").html("<h2 style='text-align:center; color: navy'> Time Remaining " + number + " Seconds</h2>");
  setTimeout(run, 3000);
  $("#restartGame").hide();
}

$("div").on("click", ".answer", function(event) {
  selectedAnswer = $(this).text();
  console.log(correctArray[qCounter])
  if (selectedAnswer === correctArray[qCounter]){
    validAns = true;
  }
  stop();
  number=15;
  console.log(selectedAnswer)
  correcAnswer();
  console.log("QCounter: " +qCounter)
  if (qCounter != questionsArray.length-1){
    qCounter++;
  } else {
    console.log("thats it end of quiz");
    displayScore();
    $("#restartGame").show();
    return false;
  }
  timeUp=false;
  validAns = false;
  $("#timerDiv").html("<h2 style='text-align:center; color: navy'> Time Remaining " + number + " Seconds</h2>");
  setTimeout(run, 3000);
});
