let headTop = 5;
let headLeft = 5;
let direction = "right";
let tails = [
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
];
let food = { x: 10, y: 10 }; // food coordinates
let score = 0; // Initial score
let gameStarted = false; // Track whether the game has started

const config = {
  size: 20,
  width: 60,
  height: 40,
};

const boardEl = document.getElementById("board");
const scoreEl = document.getElementById("score");

boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

// Functions to move the snake
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
    gameStarted = true; // Indicate the game has started
    intervalID = setInterval(gameLoop, 300);
  }
}

function reset() {
  headTop = 5;
  headLeft = 5;
  direction = "right";
  tails = [
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
  ];
  score = 0;
  updateScore();
  gameStarted = false; // Reset gameStarted flag

  // Make sure the interval is cleared when restarting
  clearInterval(intervalID);
  intervalID = null;
}

function restartGame() {
  reset(); // Reset the game state
  startGame(); // Restart the game loop
}

function pauseGame() {
  clearInterval(intervalID);
  intervalID = null;
}

function updateScore() {
  scoreEl.innerText = `Score: ${score}`;
}

function gameLoop() {
  if (!gameStarted) return; // If the game hasn't started, do nothing

  // Add the current head position to the tail
  tails.push({ x: headLeft, y: headTop });

  // If the snake eats food, increase the score and generate new food
  if (headLeft === food.x && headTop === food.y) {
    score += 10;
    updateScore();
    generateFood();
  } else {
    tails.shift(); // Remove the last segment of the tail
  }

  // Check for collisions with the snake's own body
  for (let i = 0; i < tails.length - 1; i++) {
    if (tails[i].x === headLeft && tails[i].y === headTop) {
      endGame();
      return;
    }
  }

  // Move the snake in the current directio
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
  const foodHtml = `
    <div class="food" style="width: ${1 * config.size}px; height: ${
    1 * config.size
  }px; top: ${food.y * config.size}px; left: ${food.x * config.size}px"></div>
  `;
  const snakeHtml = `${headHtml} ${tailsHtml} ${foodHtml}`;
  boardEl.innerHTML = snakeHtml;
}

function generateFood() {
  let newFoodPosition;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * config.width),
      y: Math.floor(Math.random() * config.height),
    };
  } while (isFoodOnSnake(newFoodPosition));

  food = newFoodPosition;
}

function isFoodOnSnake(position) {
  for (let i = 0; i < tails.length; i++) {
    if (tails[i].x === position.x && tails[i].y === position.y) {
      return true;
    }
  }
  return false;
}

function endGame() {
  alert(`Game Over! Final Score: ${score}`);
  pauseGame();
  reset();
}
