import {width} from './canvas';

export let controlBox : HTMLDivElement = document.querySelector('#controls');
controlBox.style.width = `${width}px`

export function makeButton (name : string) : HTMLButtonElement {
  let button = document.createElement("button");
  button.innerText = name;
  controlBox.appendChild(button);
  return button;
}


//make input stuff

export function makeInput (inputType : string) : HTMLInputElement {
  let input = document.createElement('input');
  // Set type attribute to inputtype
  input.setAttribute(
    'type',inputType
  );  
  controlBox.appendChild(input);
  return input;
}

export function makeLabeledInput (labelText : string, inputType : string) : HTMLInputElement {
  let label = document.createElement('label');
  label.textContent = labelText;
  let input = document.createElement('input');
  input.setAttribute('type',inputType);
  label.appendChild(input);
  controlBox.appendChild(label);
  return input;
}