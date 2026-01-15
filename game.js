let gameSeq = [];
let userseq = [];
let highestscore = 0;

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
  }
  levelUp();
});
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 100);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 100);
}
function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randbtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameSeq[idx]) {
    if (userseq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    let body = document.querySelector("body");
    body.classList.add("alert");
    setTimeout(() => {
      body.classList.remove("alert");
    }, 100);

    if (level > highestscore) {
      highestscore = level;
    }
    console.log("This is the last highest score", highestscore);
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to Restart.`;
    let span =document.querySelector("span");
    span.innerHTML=`The Highest score was ${highestscore} . `;
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userseq.push(userColor);
  checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
function reset() {
  started = false;
  gameSeq = [];
  userseq = [];
  level = 0;
}
