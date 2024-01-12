// Define constants and variables for the game
let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let score = 0;

// Execute when the window has finished loading
window.onload = function () {
    // Get the canvas element and set its dimensions
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    // Initialize the game by placing the initial food, setting up event listeners, and starting the game loop
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

// Update function - the core of the game loop
function update() {
    // If the game is over, exit the function
    if (gameOver) {
        return;
    }

    // Draw the red background on the canvas
    context.fillStyle = "Red";
    context.fillRect(0, 0, board.width, board.height);

    // Draw the food on the canvas
    context.fillStyle = "white";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Check if the snake has eaten the food
    if (snakeX == foodX && snakeY == foodY) {
        // Increase the score, add a new segment to the snake's body, place new food, and update the score display
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        updateScore();
    }

    // Move the snake's body segments
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    // Update the first segment of the snake's body with its current position
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Draw the snake's head on the canvas
    context.fillStyle = "black";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // Draw the snake's body on the canvas
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Check for collisions with the canvas boundaries
    if (snakeX < 0 || snakeX > total_col * blockSize || snakeY < 0 || snakeY > total_row * blockSize) {
        // If a collision occurs, set the game over flag, display an alert with the final score, and exit the game loop
        gameOver = true;
        alert("Game Over. Your score is: " + score);
    }

    // Check for collisions with the snake's own body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            // If a collision occurs, set the game over flag, display an alert with the final score, and exit the game loop
            gameOver = true;
            alert("Game Over. Your score is: " + score);
        }
    }
}

// Event handler for changing the direction of the snake
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

// Function to place food at a random position on the canvas
function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

// Function to update and display the score on the canvas
function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;
}
