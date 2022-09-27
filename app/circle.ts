import {ctx, canvas} from './canvas';
import {makeButton} from './controls';
import './settings';

function drawOnClick (event) {
  ctx.beginPath
  ctx.arc(event.offsetX, event.offsetY, 150, 0, Math.PI*2)
  ctx.stroke();
  ctx.closePath
  
}

let drawingLines = false;
let drawLineButton = makeButton('Draw Circle');
drawLineButton.addEventListener(
  "click",
  function () {    
    if (!drawingLines) {
      ctx.beginPath();
      canvas.addEventListener('click',drawOnClick);
      drawingLines = true;
      drawLineButton.textContent = 'Stop drawing circles';
    } else {
      drawingLines = false;
      canvas.removeEventListener('click',drawOnClick);
      drawLineButton.textContent = 'Draw Circle';
    }
  }
)