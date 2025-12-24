const board = document.querySelector(".board");

const blHght = 30;
const blWidth = 30;

const cols = Math.floor(board.clientWidth / blWidth);
const rows = Math.floor(board.clientHeight / blHght);
const btnstart = document.querySelector(".btn_start");
const desc = document.querySelector(".desc");
const start = document.querySelector(".start_game");
const end = document.querySelector(".game_over");
const restbtn = document.querySelector(".btn_over");
const highscore=document.querySelector("#high_sc");
const score=document.querySelector("#score")
const time=document.querySelector("#time");


const finalScoreEl = document.querySelector("#final_score");
const finalHighScoreEl = document.querySelector("#final_high_score");

let highsc=localStorage.getItem("highsc") || 0;
let sc=0;
let t=`00-00`;
highscore.textContent=highsc;
const blocks = [];
let snake = [{ x: 1, y: 4 }];
let dirn = "right";
let id = null;
let timeid=null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${r}-${c}`] = block;
  }
}

function rendersnake() {
  let head = null;

  



  blocks[`${food.x}-${food.y}`].classList.add("food");
  if (dirn === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (dirn === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (dirn === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (dirn === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }
for (let i = 0; i < snake.length; i++) {
  if (snake[i].x === head.x && snake[i].y === head.y) {
    clearInterval(id);
    clearInterval(timeid);
    desc.style.display = "flex";
    start.style.display = "none";
    end.style.display = "flex";
    return;
  }
}
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(id);
    desc.style.display = "flex";
    start.style.display = "none";
    end.style.display = "flex";
     finalScoreEl.textContent = sc;
  finalHighScoreEl.textContent = highsc;
    return;
  }
  snake.forEach((pos) => {
    blocks[`${pos.x}-${pos.y}`].classList.remove("fill");
  });

  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    
    snake.unshift(head);
    sc++;
    score.textContent=sc;
    if(sc>highsc){
        highsc=sc;
        localStorage.setItem("highsc",highsc.toString());
    }
     blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
  }
  else{
 snake.unshift(head);
  snake.pop();
  }

 
  snake.forEach((pos) => {
    blocks[`${pos.x}-${pos.y}`].classList.add("fill");
  });
}

btnstart.addEventListener("click", function () {
  desc.style.display = "none";
  id = setInterval(function () {
    rendersnake();
  }, 300);

  timeid=setInterval(function(){
     let [min,sec]=t.split("-").map(Number);
     if(sec==59){
        min++;
        sec=0;
     }
     else{
        sec++;
     }
     t=`${min}-${sec}`;
     time.textContent=t;
  },1000);
});

restbtn.addEventListener("click", function () {
  restartgame();
});


function restartgame() {
    clearInterval(id);
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((pos) => {
    blocks[`${pos.x}-${pos.y}`].classList.remove("fill");
  });
  desc.style.display = "none";
  dirn = "right";
  sc=0;
  t=`00-00`
  score.textContent=sc;
  time.textContent=t;
  highscore.textContent=highsc;
  snake = [{ x: 1, y: 4 }];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  id = setInterval(function () {
    rendersnake();
  }, 300);
}

document.addEventListener("keydown", function (e) {
  // console.log(e.key);
  if (e.key == "ArrowUp") {
    dirn = "up";
  } else if (e.key == "ArrowDown") {
    dirn = "down";
  } else if (e.key == "ArrowLeft") {
    dirn = "left";
  } else if (e.key == "ArrowRight") {
    dirn = "right";
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && dirn !== "down") dirn = "up";
  else if (e.key === "ArrowDown" && dirn !== "up") dirn = "down";
  else if (e.key === "ArrowLeft" && dirn !== "right") dirn = "left";
  else if (e.key === "ArrowRight" && dirn !== "left") dirn = "right";
});
