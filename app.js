const colors = [
  ['#9c9c9c', '#c4c2c2', '#ffc0c0'],
  ['#ce3e3e', '#bc3535', '#e01d1d'],
  ['#957237', '#926820', '#a4731f',],
  ['#5770ba', '#3153b9', '#214ac6'],
];

const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(timeEl, time);
  createCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    setTime(timeEl, current);
  }
}

function setTime(timeEl, value) {
  timeEl.innerHTML = value < 10 ? `00:0${value}` : `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`;
}

function createCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect()
  const posX = getRandomNumber(0, width - size);
  const posY = getRandomNumber(0, height - size);
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${posY}px`;
  circle.style.left = `${posX}px`;
  const [first, second, third] = getRandomColor();
  circle.style.background = `linear-gradient(90deg, ${first} 0%, ${second} 47%, ${third} 100%)`;
  board.appendChild(circle);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
