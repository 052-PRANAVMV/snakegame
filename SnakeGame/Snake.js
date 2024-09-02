import { getInputDirection } from "./input.js";

//For Snake Speed adjustments
//Places the snake in middle (initial position)
let snakeBody=[{x:11,y:11}];
//new segments are added to the body when eaten food
let newSegments = 0;
const scoreCard=document.getElementById('score-card')

export function update()
{
    addSegments();
    const inputDirection = getInputDirection();
    //To make the bodypieces follow the head
    for(let i= snakeBody.length-2;i>=0;i--)
    {
        snakeBody[i+1]={...snakeBody[i]};
    }
    snakeBody[0].x+=inputDirection.x;
    snakeBody[0].y+=inputDirection.y;
}

export function draw(gameBoard)
{
    snakeBody.forEach(segment =>{
    //creating snake Element and placing with styles
    const snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart =segment.x;
    //added to a classList for other styles
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
});
}


//creates new segments based on amt of food eaten
export function expandSnake(amount)
{
    
    newSegments+=amount;
}


//To find snake meets the food or not
export function onSnake(position,{ignoreHead = false}={})
{
    return snakeBody.some((segment,index) =>{
      if(ignoreHead && index===0) return false
      return  equalPositions(segment,position)
    })
}

export function getSnakeHead()
{
    return snakeBody[0];
}

export function snakeIntersection()
{
    return onSnake(snakeBody[0],{ignoreHead: true})
}

//Snake meeting food is found by same x and y coordinates
function equalPositions(pos1,pos2)
{
    return pos1.x===pos2.x && pos1.y===pos2.y
}

//pushes newSegments to Snake
function addSegments()
{
    for(let i=0;i<newSegments;i++)
    {
        snakeBody.push({...snakeBody[snakeBody.length-1]});
    }

    newSegments=0; //Resets for next food
}

