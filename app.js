'use strict';

const scoreContainer = document.getElementById('score');
const colorCodeContainer = document.getElementById('color-code');
const optionsContainer = document.getElementById('options-container');
let score = 0;
let randomColor = null;

function generateRandoomNumber(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generateRandomColor() {
    const red = generateRandoomNumber(0, 255);
    const green = generateRandoomNumber(0, 255);
    const blue = generateRandoomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function updateScore() {
    scoreContainer.innerText = score;
}

function validateResult(ele) {
    const selectedColor = ele.target.style.backgroundColor;
    if (selectedColor === randomColor) score += 1;
    else score = 0;
    updateScore();
    localStorage.setItem('score', score);
    startGame();
}


function startGame() {
    score = parseInt(localStorage.getItem('score'));
    optionsContainer.innerHTML = null;
    randomColor = generateRandomColor();
    colorCodeContainer.innerText = randomColor;
    const randomIndex = generateRandoomNumber(0, 5);
    for (let i = 0; i < 6; i++) {
        const div = document.createElement('div');
        div.addEventListener('click', validateResult);
        div.style.backgroundColor = i === randomIndex ? randomColor : generateRandomColor();
        optionsContainer.appendChild(div);
    }
}

window.addEventListener('load', () => {
    startGame();
    updateScore();
});