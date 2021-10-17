const startButton = document.getElementById("startBtn");
const checkButton = document.getElementById("checkBtn");
const fileds = document.getElementsByClassName("field");
const selectDif = document.getElementById("selectDif");
const timePassedPragraph = document.getElementById("timePassed");
const resultsContiner = document.getElementById("results-continer");
let results = [];
let timer;
let difLevel = "easy";
let difficultyLevels = {
  easy: 5000,
  normal: 4000,
  hard: 3000,
  veryhard: 2000,
};

selectDif.addEventListener("change", function () {
  difLevel = this.value;
});

// > Generisi 9 random brojeva i sacuvaj ih u niz
let numbersArray = [];
let usersArray = [];
let correctPrecent = 0;

startButton.addEventListener("click", function () {
  numbersArray = [];
  for (var i = 0; i < fileds.length; i++) {
    let br = Math.floor(Math.random() * 9 + 1);
    fileds[i].classList.remove("correct", "incorrect");

    numbersArray.push(br);
  }
  console.log(numbersArray);
  timer = new Date().getTime();

  for (var i = 0; i < numbersArray.length; i++) {
    console.log(fileds[i]);
    fileds[i].value = numbersArray[i];
  }
  setTimeout(() => {
    for (var i = 0; i < fileds.length; i++) {
      fileds[i].value = "";
    }
    startButton.classList.add("hide");
    checkButton.classList.remove("hide");
  }, difficultyLevels[difLevel]);
});

checkButton.addEventListener("click", function () {
  timer = new Date().getTime() - timer; // 15565
  timer = Math.round(timer / 100) / 10; // > 155.65 -> 156 -> 15.6

  usersArray = [];
  for (var i = 0; i < fileds.length; i++) {
    usersArray.push(Number(fileds[i].value));
  }

  const [correctArray, incorrectArray] = checkArrays(usersArray, numbersArray);
  correctPrecent =
    Math.floor((correctArray.length / numbersArray.length) * 1000) / 10; // > 5 / 9 -> 0.55555555555555. 555.555555 -> 556 -> 55.6%
  for (let i = 0; i < correctArray.length; i++) {
    fileds[correctArray[i]].classList.add("correct");
  }
  for (let i = 0; i < incorrectArray.length; i++) {
    fileds[incorrectArray[i]].classList.add("incorrect");
  }

  timePassedPragraph.innerText = `Vreme za koje ste odgorili je ${timer}s \n Procenat tačnosti je ${correctPrecent}%`;
  startButton.classList.remove("hide");
  checkButton.classList.add("hide");
  results.push(
    `<p>Nivo težine: <span>${difLevel}</span>  Vreme: <span>${timer}s</span> Tačnost:  <span>${correctPrecent}%</span></p>`
  );
  resultsContiner.innerHTML = results;
  // > Proveri da li su tacnoi unosi
});

function checkArrays(arrOne, arrTwo) {
  let correctArray = [];
  let incorrectArray = [];
  for (let i = 0; i < arrOne.length; i++) {
    if (arrOne[i] === arrTwo[i]) {
      correctArray.push(i);
    } else {
      incorrectArray.push(i);
    }
  }
  return [correctArray, incorrectArray];
}
