'use strict';

const cardsContainer = document.querySelector('.card-container');
const overlayEl = document.querySelector('.overlay');
const startEl = document.querySelector('#start');
const gameScore = document.querySelector('#start-game h1');
const showScoreEl = document.querySelector('.show-score');
const leftEl = document.querySelector('.left');
const maxEl = document.querySelector('.max');
const scoresEl = document.querySelector('.scores');

const totalCards = 16;
let allCards = [];
let randArr = [];
let winNums = [];
let showItems = 0;
let leftClicks = -1;
let maxClicks = 25;
let scores = 0;

function setRandArr() {
  const rand = Math.floor(Math.random() * totalCards);

  if (!randArr.includes(rand)) randArr.push(rand);
  if (randArr.length < totalCards) setRandArr();

  displayUI(randArr);
}

function displayUI(cards) {
  cardsContainer.innerHTML = '';

  cards.forEach((card) => {
    cardsContainer.innerHTML += `
					<div class="card show" data-set="${card + 1}">
						<div class="front">
							<img src="img/${card + 1}.png" />
						</div>
						<div class="back"></div>
					</div>
		`;
  });

  allCards = cardsContainer.querySelectorAll('.card');
  allCards.forEach((card) => card.addEventListener('click', showCard));
}

function showCard(e) {
  if (showItems > 1) return;
  showItems++;
  const target = e.target.closest('.card');
  const dataSet = +target.getAttribute('data-set');

  target.classList.remove('show');
  setTimeout(() => {
    target.classList.add('show');
    showItems--;
  }, 2000);

  isMatch(dataSet);
  setWinNums(dataSet);
  isGameover();
}

function isMatch(data) {
  if (winNums[0] === data) {
    scores++;
    allCards.forEach((card) => {
      const dataSet = +card.getAttribute('data-set');

      if (winNums[0] === dataSet || winNums[1] === dataSet) {
        card.classList.add('matched');
      }
    });
  }
}

function setWinNums(data) {
  if (data > 8) winNums[0] = data - 8;
  if (data <= 8) winNums[0] = data + 8;
  winNums[1] = data;
}

function isGameover() {
  leftClicks++;
  leftEl.textContent = leftClicks;
  maxEl.textContent = maxClicks;
  scoresEl.textContent = scores;

  if (leftClicks === maxClicks) {
    gameScore.textContent = `You Got ${scores} from 8`;
    overlayEl.classList.remove('hidden');

    init();
    return;
  }
}

function gameStart() {
  overlayEl.classList.add('hidden');
  init();
}

function init() {
  allCards = [];
  randArr = [];
  winNums = [];
  showItems = 0;
  leftClicks = -1;
  maxClicks = 25;
  scores = 0;

  setRandArr();
  isGameover();
}

////////////////
init();
startEl.addEventListener('click', gameStart);
