import { onSnake,expandSnake } from "./Snake.js";
import { randomGridPosition } from "./Grid.js";
import { incrementScore } from "./game.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update()
{
    if(onSnake(food))
    {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
        incrementScore();
    }
}

export function draw(gameBoard)
{
    const foodElement=document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    //added to a classList for other styles
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    //Assigning new Food Position
    let newFoodPosition;
    //Basically if no newFoodPosition is there, the loops assign a random food position
    //if newFoodPosition is not assigned to any value,..the loop works
    //if snake ate the food,.. the loop works
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
}

