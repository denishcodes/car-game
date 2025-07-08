const car = document.getElementById("car");
const obstacle = document.getElementById("obstacle");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const carSpeedEl = document.getElementById("carSpeed");
const runSpeedEl = document.getElementById("runSpeed");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

let carPosition = 175;
let moveSpeed = 25;
let gameSpeed = 5;
let obstaclePosition = -120;

let score = 0;
let time = 0;
let lastMoveTime = 0;
let carSpeed = 0;

let gameInterval;
let timerInterval;

document.addEventListener("keydown", (e) => {
  const now = Date.now();
  if (e.key === "ArrowLeft" && carPosition > 0) {
    carPosition -= moveSpeed;
    car.style.left = carPosition + "px";
    carSpeed = Math.round((moveSpeed / ((now - lastMoveTime) / 1000)) || 0);
    lastMoveTime = now;
  }
  if (e.key === "ArrowRight" && carPosition < 350) {
    carPosition += moveSpeed;
    car.style.left = carPosition + "px";
    carSpeed = Math.round((moveSpeed / ((now - lastMoveTime) / 1000)) || 0);
    lastMoveTime = now;
  }
  if (e.key === "ArrowUp") {
    gameSpeed += 1;
    updateSpeedDisplay();
  }
  if (e.key === "ArrowDown" && moveSpeed > 5) {
    moveSpeed -= 5;
    updateSpeedDisplay();
  }
});

function updateSpeedDisplay() {
  carSpeedEl.textContent = `Car Speed: ${carSpeed} px/s`;
  runSpeedEl.textContent = `Run Speed: ${gameSpeed} px/frame`;
}

function startGame() {
  updateSpeedDisplay();
  gameInterval = setInterval(() => {
    obstaclePosition += gameSpeed;
    obstacle.style.top = obstaclePosition + "px";

    if (obstaclePosition > 600) {
      obstaclePosition = -120;
      obstacle.style.left = Math.floor(Math.random() * 7) * 50 + "px";
      score += 10;
      scoreEl.textContent = `Score: ${score}`;
    }

    const carRect = car.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
      carRect.left < obsRect.right &&
      carRect.right > obsRect.left &&
      carRect.top < obsRect.bottom &&
      carRect.bottom > obsRect.top
    ) {
      endGame();
    }

    updateSpeedDisplay();
  }, 30);

  timerInterval = setInterval(() => {
    time++;
    timerEl.textContent = `Time: ${time}s`;
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  finalScore.innerHTML = `Time: <b>${time}</b> seconds<br>Score: <b>${score}</b>`;
  gameOverScreen.style.display = "flex";
}

function restartGame() {
  carPosition = 175;
  car.style.left = carPosition + "px";
  obstaclePosition = -120;
  obstacle.style.top = "-120px";
  obstacle.style.left = "175px";

  time = 0;
  score = 0;
  moveSpeed = 25;
  gameSpeed = 10;
  carSpeed = 0;

  timerEl.textContent = "Time: 0s";
  scoreEl.textContent = "Score: 0";
  updateSpeedDisplay();
  gameOverScreen.style.display = "none";

  startGame();
}

function goBack() {
  alert("Back to Menu clicked! You can link this to your homepage later.");
}

startGame();
