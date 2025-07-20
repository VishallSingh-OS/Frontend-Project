let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let score = 0;

let btns = ["yellow", "green", "red", "purple"];

let h2 = document.querySelector("h2");
let scoreDisplay = document.getElementById("score");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  let color = btn.getAttribute("id");
  btn.classList.add("userFlash");
  playSound(color);

  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  level++;
  h2.innerText = `Level ${level}`;

  let randIndx = Math.floor(Math.random() * 4);
  let randColor = btns[randIndx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);

  btnFlash(randBtn);
}

function updateScoreDisplay() {
  scoreDisplay.innerText = `Score: ${score.toFixed(1)}`;
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    score += 0.5;
    updateScoreDisplay();

    if (userSeq.length === gameSeq.length) {
      score += 10;
      updateScoreDisplay();

      setTimeout(levelUp, 1000);
      userSeq = [];
    }
  } else {
    console.log("game over");
    playSound("wrong");
    h2.innerText = `Game over! Press any key to start`;
    document.body.classList.add("game-over");

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    reset();
  }
}

function btnPress() {
  let pressedBtn = this;
  userFlash(pressedBtn);
  let userColor = pressedBtn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  score = 0;
  updateScoreDisplay();
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.wav`);
  audio.play();
}
