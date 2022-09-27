import {ctx} from './canvas';
import {makeButton} from './controls';

ctx.strokeStyle = 'blue'


// size + color changer


import {makeLabeledInput,makeInput} from './controls'

let colorInput = makeInput('color');
colorInput.addEventListener('change',
  function () {//this functions important for a reason
  ctx.strokeStyle = colorInput.value;})
;

let sizeInput = makeLabeledInput('Size:','range');
sizeInput.setAttribute('max',200);
sizeInput.setAttribute('min',1)
sizeInput.addEventListener(
  'change',
  function () {
    ctx.lineWidth = sizeInput.valueAsNumber;
  }
)
  

