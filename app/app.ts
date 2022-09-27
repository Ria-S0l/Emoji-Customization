import {ctx, canvas} from './canvas';
import {makeButton} from './controls';
import './settings';


let lastX = null
let lastY = null

//draw circle

let draw_shape_button = makeButton("Draw Circle");
import "./circle"
let a = 400
let b = 100

draw_shape_button.addEventListener(
  "click",
  function (event) {
    ctx.beginPath();
    ctx.arc(a-35,a-60,b+10,b-100,Math.PI*2);
    ctx.stroke();
  }
)

//draw straight line

function drawOnClick (event) {
  if (lastX) {
  ctx.beginPath ()
  ctx.moveTo(lastX,lastY)
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
  }
  
  lastX = event.offsetX
  lastY = event.offsetY
}

let drawingLines = false;
let drawLineButton = makeButton('Ruler');
drawLineButton.addEventListener(
  "click",
  function () {
    if (!drawingLines) {
      ctx.beginPath();
      
canvas.addEventListener('click', drawOnClick);
      drawingLines = true;
      drawLineButton.textContent = 'Stop drawing line';
    } else { 
      drawingLines = false;
      
canvas.removeEventListener('click',drawOnClick);
      drawLineButton.textContent = 'Ruler';
    }
  }
)

//drawline
let drawingPen = false;
let drawPenButton = makeButton('Draw Lines');
drawPenButton.addEventListener(
  "click",
  function () {
    if (!drawingPen) {
      ctx.beginPath();
      
canvas.addEventListener('mousemove', drawOnDrag);
      drawingPen = true;
      drawPenButton.textContent = 'Stop drawing lines';
    } else { 
      drawingPen = false;
      
canvas.removeEventListener('mousemove',drawOnClick);
      drawPenButton.textContent = 'Draw Lines';
    }
  }
)

function drawOnDrag (event : MouseEvent) {
  if (event.buttons) {
    //draw when mouse is clicked down
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  } else {
    //start new path once mouse click is lifted
    ctx.beginPath();
  }
}

//draw line


//clear button
let clear_screen_button = makeButton('Clear Screen');
clear_screen_button.addEventListener(
  'click',
  function() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }
)

