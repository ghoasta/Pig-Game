'use strict';

//they work the same (query selector and get element by id)
const player0_element = document.querySelector('.player--0');
const player1_element = document.querySelector('.player--1');
const score0_element = document.querySelector('#score--0');
const score1_element = document.getElementById('score--1');
const current0_element = document.getElementById('current--0');
const current1_element = document.getElementById('current--1');
const dice_element = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHow = document.querySelector('.btn--how');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

let scores, current_score, active_player, playing;

function init() {
  scores = [0, 0]; //final scores for both players, p1 at [0], p2 at 1]
  current_score = 0;
  active_player = 0;
  playing = true; //state of the game

  score0_element.textContent = 0;
  score1_element.textContent = 0;
  current0_element.textContent = 0;
  current1_element.textContent = 0;

  dice_element.classList.add('hidden');
  player0_element.classList.remove('player--winner');
  player1_element.classList.remove('player--winner');
  player0_element.classList.add('player--active');
  player1_element.classList.remove('player--active;');
}

//start of app!
init();

function switchPlayer() {
  document.getElementById(`current--${active_player}`).textContent = 0;
  active_player = active_player === 0 ? 1 : 0;
  current_score = 0;
  player0_element.classList.toggle('player--active');
  player1_element.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate dice roll 1-6
    let dice_roll = Math.trunc(Math.random() * 6) + 1;
    console.log(dice_roll);
    //display dice
    dice_element.classList.remove('hidden');
    dice_element.src = `dice-${dice_roll}.png`;
    //check for 1 and switch players
    //first we need to add to score
    if (dice_roll !== 1) {
      current_score += dice_roll;
      document.getElementById(`current--${active_player}`).textContent =
        current_score;
    } else {
      //set current  to 0
      //remove player actove from 0 and add player active to 1
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to score of active player
    scores[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];
    //check if score is >= 100

    if (scores[active_player] >= 100) {
      playing = false;
      dice_element.classList.add('hidden');
      document
        .querySelector(`.player--${active_player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  //finish the game, if not switch player
});

btnNew.addEventListener('click', init);

btnHow.addEventListener('click', function () {
  console.log('how pressed');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
