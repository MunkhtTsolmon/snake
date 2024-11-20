let headTop = 5;
let headLeft = 5;
let direction = "right";
let tails = [
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
];

const config = {
  size: 20,
  width: 60,
  height: 40,
};

const boardEl = document.getElementById("board");
boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

function goUp() {
  headTop = headTop - 1;
  if (headTop < 0) {
    headTop = config.height - 1;
  }
  render();
}

function goDown() {
  headTop = headTop + 1;
  if (headTop === config.height) {
    headTop = 0;
  }
  render();
}

function goRight() {
  headLeft = headLeft + 1;
  if (headLeft === config.width) {
    headLeft = 0;
  }
  render();
}
function goLeft() {
  headLeft = headLeft - 1;
  if (headLeft < 0) {
    headLeft = config.width - 1;
  }
  render();
}

function changeDirection(newDirection) {
  if (direction === "up" || direction === "down") {
    if (newDirection === "right" || newDirection === "left") {
      direction = newDirection;
    }
  } else if (direction === "right" || direction === "left") {
    if (newDirection === "up" || newDirection === "down") {
      direction = newDirection;
    }
  }
}

let intervalID = null;

function startGame() {
  if (!intervalID) {
    intervalID = setInterval(gameLoop, 300);
  }
}
function reset() {
  headTop = 5;
  headLeft = 5;
  direction = "right";
}
function restartGame() {
  startGame();
  reset();
}
function pauseGame() {
  clearInterval(intervalID);
  intervalID = null;
}

function gameLoop() {
  tails.push({ x: headLeft, y: headTop });
  tails.shift();
  switch (direction) {
    case "up":
      goUp();
      break;
    case "right":
      goRight();
      break;
    case "down":
      goDown();
      break;
    case "left":
      goLeft();
      break;
  }
}

function listenkeys(event) {
  const key = event.key;
  switch (key) {
    case "ArrowUp":
      changeDirection("up");
      break;
    case "ArrowDown":
      changeDirection("down");
      break;
    case "ArrowLeft":
      changeDirection("left");
      break;
    case "ArrowRight":
      changeDirection("right");
      break;
  }
}
document.addEventListener("keydown", listenkeys);

function render() {
  let tailsHtml = ``;
  for (let i = 0; i < tails.length; i++) {
    tailsHtml += `<div class="snake" style="width: ${
      1 * config.size
    }px; height: ${1 * config.size}px; top: ${
      tails[i].y * config.size
    }px; left: ${tails[i].x * config.size}px"></div>`;
  }
  const headHtml = `
    <div class="snake" style="width: ${1 * config.size}px; height: ${
    1 * config.size
  }px; top: ${headTop * config.size}px; left: ${
    headLeft * config.size
  }px"></div>
    `;
  const snakeHtml = `${headHtml} ${tailsHtml}`;
  boardEl.innerHTML = snakeHtml;
}
