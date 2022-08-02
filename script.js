const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = screen.width;
canvas.height = 500;
document.getElementById('theCanvas').appendChild(canvas);
const canvasX = canvas.clientX;
const canvasY = canvas.clientY;

let isBackgroundReady = false;
let backgroundImage = new Image();
backgroundImage.onload = function () {
  isBackgroundReady = true;
};
backgroundImage.src = 'images/background.png';

// Bug image
let isBugReady = false;
let bugImage = new Image();
bugImage.onload = function () {
  isBugReady = true;
};
bugImage.src = 'images/bug.png';

// initialize score to 0
let score = 0;
// initialize hop interval to 5 seconds
let hopInterval = 5000;
//set hopping
let hop = setInterval(function () {
  resetLocation();
}, hopInterval);

const bug = {
  speed: 256, // movement in pixels per second
};

// Handle mouse click events to check if the user clicked
// on the bug
canvas.addEventListener('mousedown', clicked, false);
function clicked(e) {
  e.preventDefault();
  // Get the location of the mouse click
  let x = e.clientX;
  let y = e.clientY;

  // check if the player clicked on the bug
  if (x > bug.x && x < bug.x + 100 && y > bug.y && y < bug.y + 169) {
    score += 1;
    resetLocation();
    // reduce hop interval, but should not be less than 0
    if (hopInterval - 100 >= 50) {
      clearInterval(hop);
      hopInterval -= 100;
      hop = setInterval(function () {
        resetLocation();
      }, hopInterval);
    }
  }
}

// Reset the bug location when the player restarts or catches a bug
const resetLocation = function () {
  // Throw the bug somewhere on the screen randomly
  bug.x = 32 + Math.random() * (canvas.width - 64);
  bug.y = 32 + Math.random() * (canvas.height - 64);
};

// Reset hopping interval
const resetSpeed = function () {
  clearInterval(hop);
  hopInterval = 2000;
  hop = setInterval(function () {
    resetLocation();
  }, hopInterval);
};
const resetScore = function () {
  score = 0;
  // reset the speed
  resetSpeed();
};

// Draw everything
const render = function () {
  if (isBackgroundReady) {
    ctx.drawImage(backgroundImage, 0, 0);
  }

  if (isBugReady) {
    ctx.drawImage(bugImage, bug.x, bug.y);
  }

  // Score
  document.getElementById('score').innerHTML = 'Score : ' + score;
};

// The main game loop
const main = function () {
  render();

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
const w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Play this game!
main();
