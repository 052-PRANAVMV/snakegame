import {getSnakeHead,snakeIntersection,update as updateSnake, draw as drawSnake, expandSnake} from './Snake.js';
import {update as updateFood,draw as drawFood} from './Food.js';
import { outsideGrid, randomGridPosition } from './Grid.js';
let lastRenderTime=0;
//lastRenderTime is always updated
//Retrieving highScore from local Storage 
let highScore = localStorage.getItem('highScore') || 0;
let score=0;
let gameOver = false;
let snakeSpeed =10; //default value 

//Drawing the GameBoard to append snake and food which is done in respective js files
const gameBoard=document.getElementById('game-board')
const scoreElement=document.getElementById('score')
const slowButton=document.getElementById('slow')
const mediumButton=document.getElementById('medium')
const fastButton=document.getElementById('fast')


//Adding eventlisteners for speed buttons
slowButton.addEventListener('click',()=>setSnakeSpeed(5));
mediumButton.addEventListener('click',()=>setSnakeSpeed(10));
fastButton.addEventListener('click',()=>setSnakeSpeed(15));

function setSnakeSpeed(speed)
{
  snakeSpeed=speed;
  resetGame();
}


//function-loops for each window frame
function main(currentTime)
{
    if(gameOver)
    {
      if(score>highScore)
      {
        highScore = score;
        //updating highscore in local storage
        localStorage.setItem('highScore',highScore);
        alert(`New High Score! Your Score was : ${score}`);
      }
      else{
        alert(`Game Over! Your Score was : ${score}`);
      }
      resetGame();
        //Reset the game with initial score and frames
      return;
    }
    //Requesting animation frame to change frames each time website renders
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime-lastRenderTime)/1000;
    //We don't have to move the snake if last render happened is less than the snake movement per second
    if(secondsSinceLastRender<1/snakeSpeed) return
      
    lastRenderTime=currentTime;

    //updates the snake(body,state(lose),movement)
    update();
    //brings the snake,food to the updated position
    draw();
}

//First request of animation frame for main
window.requestAnimationFrame(main);


function update()
{
  updateSnake();
  updateFood();
  checkDeath();
  updateScore();
}



function draw()
{
  gameBoard.innerHTML= '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath()
{
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}



function updateScore()
{
  scoreElement.textContent = `Score : ${score}`;
}

export function incrementScore()
{
  score++;
  updateScore();
}

function resetGame()
{
  score=0;
  updateScore();
  gameOver=false;
  //Resetting snake and food position for new game
  window.requestAnimationFrame('main');
}