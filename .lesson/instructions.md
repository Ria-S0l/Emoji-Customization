# Your Drawing App

Welcome to your first app! Our goal with this project will be to create a simple drawing game. When you're done, you'll publish the game and be able to share it with your friends.

I walked through the first steps of this in video form for those of you who prefer watching things done to reading about them: [Video Walkthrough of First Steps](https://www.youtube.com/watch?v=GHDVMJqU4uY)

## Getting Started...

To get started, let me tell you a few details about this project that might be new.

### About TypeScript

Most files in this project end with "ts" instead of "js," which means they are in TypeScript and not JavaScript. TypeScript adds some extra information to JavaScript files which makes it easier for your editor to give you hints and show you when you might be making mistakes.

Any JavaScript is valid TypeScript, but sometimes TypeScript files add extra type informaton that is not valid JavaScript.

This project is set up with a special system called "Vite" which compiles your typescript into JavaScript and lets it run. You pretty much don't have to worry about the details -- it should all just work.

### About this Vite Project

This project is set up to automatically compile your code and reload the browser as soon as you make changes to code. Usually it works -- if it doesn't, try hitting "stop" and "run" again.

If you're in the middle of typing and you create code that is syntactically invalid (such as starting a tag but not ending it in html or starting a block but not closing it in code), you'll see an error until you fix the code.

*Most of your editing will be in files that end with ".ts" for typescript. You might also change the title of your program in "index.html".* 

**You should not edit any of the config files or other files in this project as doing so could make Vite stop working correctly.** 

### About Modules

One nice thing about this Vite system is that it enables you to break your code into "modules" or different files. This makes it much easier to organize your code one piece at a time. 

As this code is set-up, there is a chain of "imports" which gets your code running.

1. In *index.html* there is a `<script>` tag which points to `main.js`
2. In `main.js` there are `import` statements which import the TypeScript code in `app/app.ts`
3. In `app.ts` there are special import statements which import code from `canvas.ts` and `controls.ts`
4. In `canvas.ts` and `controls.ts` there is the special word `export` which makes certain functions or variables available to be imported by other files.

It's nice to organize your code in modules, with each module having a single, clear purpose and group of related code together.

For example if you look at my `controls.ts` file, it exports a single function called `makeButton` which will create a new button and add it to the app.

## Your First Button

If you look at app.ts, it is currently blank, but I've put the import statements at the top of the file for you to import a few key variables.

- ctx : the drawing context for the canvas
- canvas : the canvas object itself
- makeButton : the method for adding buttons to your simple drawing game.

Let's go ahead and set up some sample code to run when you build your game.

*app.ts*

```typescript
let drawCircleButton = makeButton("Draw Semicircle");

drawCircleButton.addEventListener(
  "click",
  function () {
    ctx.beginPath();
    ctx.arc(300,300,100,0,Math.PI);
    ctx.stroke();
  }
)
```

Once you add that code, you should have a button which draws a semicircle.

## Adding a button to clear the screen

It's natural to want to clear the screen next. Let's go ahead and make a second button to clear the screen:

```typescript
let clearScreenButton = makeButton('Clear Screen');
clearScreenButton.addEventListener(
  'click',
  function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
);
```

# Getting Fancier: Adding a new "pen" to the screen

In a drawing game, you usually want to do more than simply draw one item on the screen in the same place each time. We're going to practice doing something a bit more complicated by making a two-part action: first clicking a button to choose a "tool" and then responding to actions on the canvas.

To do this, we'll need to create a function for drawing, like this:

```typescript

function drawOnClick (event) {
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}
```

Next, we'll need to make a button that starts that off:

```typescript
let drawingLines = false;
let drawLineButton = makeButton('Draw Lines');
drawLineButton.addEventListener(
  "click",
  function () {    
    if (!drawingLines) {
      ctx.beginPath();
      canvas.addEventListener('click',drawOnClick);
      drawingLines = true;
      drawLineButton.textContent = 'Stop drawing lines';
    } else {
      drawingLines = false;
      canvas.removeEventListener('click',drawOnClick);
      drawLineButton.textContent = 'Draw Lines';
    }
  }
)
```

Note: this is fancy enough code, we might want to put it in its own module. We could create a file called `lineDrawing.ts` and then simply add an import at the top of app to import it, like this:

```typescript
import './lineDrawing';
```

## Next Steps:


- Implement different brushes
- Add different backgrounds to your canvas
- Create a "challenge" for your drawing.
- Save your canvas.

### Draw on Drag

[Video Walkthrough of Click-and-Drag](https://youtu.be/uI31gMeUcPc)
To change from drawing to drawing when the mouse is down, there are two steps.

First, instead of responding to the "click" event, you need to respond to the "mousemove" event, which fires each time the mouse moves.


Second, you need to use the `event.buttons` property of the Mouse Event to see whether the mouse is down when the mouse is moving. That property will be a 0 (which is "false") if there are no buttons down, or a 1 or a 2 (which is "truthy") if there *are* buttons pressed.

If you write a simple if statement in your click handler, you can then check whether the mouse is moving, like this:

```typescript

function drawOnDrag (event : MouseEvent) {
  if (event.buttons) {
    // Draw when mouse is down
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  } else {
    // Start new path once mouse is lifted
    ctx.beginPath();
  }
}
```

### Simple Settings

[Simple Settings Walk-through video](https://youtu.be/dTmjWqlY_ps)

Some simple settings to start changing are available as properties of the `ctx` object that you can change. Specifically:

- `ctx.lineWidth` the width of the line
- `ctx.strokeStyle` the color of the line
- `ctx.fillStyle` the color of the fill

To get started, I'd go ahead and create a new file called `settings.ts` in the `app` folder.

Then, add to app.ts the line to import it:
*app.ts*
```typescript
import './settings';
```

In settings, you would start by making sure you add the imports we need:

*settings.ts*
```typescript
import {ctx} from './canvas';
import {makeButton} from './controls';
```

The next step is to make sure you can change the property you want, like this:

```typescript
ctx.strokeStyle = 'blue';
```
At this point, any drawing you do should show up in blue.

Finally, let's just wire up a button to change the color, moving our line to set the color inside a function, like this:

```typescript
let drawInBlueButton = makeButton('Blue');
drawInBlueButton.addEventListener(
  'click',
  function () {ctx.strokeStyle = 'blue';}
);
```

Note, if you end up making a bunch of these buttons, you can use **chaining** to make your code a little more compact. Chaining is where you take the result of one function and then act on it. In our case, the makeButton function creates a button, which then has a `addEventListener` method we want to call. 

Here's how chaining looks:
```typescript
// make red button
makeButton('Red')
  .addEventListener(
    'click',
    function () {ctx.strokeStyle = 'red'}
  );
// make blue button
makeButton('Blue')
  .addEventListener(
    'click',
    function () {ctx.strokeStyle = 'red'}
  );
```

### Setting a Background
[Video walkthrough](https://youtu.be/c0lVI_lEO10)

You can change the `style` property of the canvas to set the background, like this:

```typescript
canvas.style.backgroundColor = 'red'
```
Or
```typescript
canvas.style.backgroundColor = 'transparent';
```

#### Background Image
To set an image instead of a color, you'll first need to upload the image to repl.it using the three-dot menu or drag and drop. You want your image in the top level folder.

Rename your image file something easy to type, like flower.jpg

In that case, you'd set the image like this::

```typescript
// Set the image to the file flower.jpg
canvas.style.backgroundImage = "url('flower.jpg')";
// Make the image cover the whole canvas
canvas.style.backgroundSize = 'cover';
```

[Full walkthrough of making background image here](https://youtu.be/c0lVI_lEO10)

## Custom Inputs for Settings

[Video Walkthrough on Adding Custom Inputs](https://youtu.be/M03vRQEhS6U)

Sometimes making buttons is not enough -- say you want to let your user choose any color they want, or choose a size for lines anywhere from 1 to 50. Making buttons for every color or every number from 1 to 50 is not a very good option.

In those cases, we can use the HTML `input` element. There are a [variety of input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) built into the browser, but for drawing games we're probably good with numbers, text and color.

### Creating a new "makeInput" function

If we look at the file `controls.ts` you'll see how I created a button and added it to the "controls" area of the webpage. 

We'll copy the `makeButton` function and modify it slightly to create a function that makes an input:

```typescript
export function makeInput (inputType : string) : HTMLInputElement {
  let input = document.createElement('input');
  // Set type attribute to inputtype
  input.setAttribute(
    'type',inputType
  );  
  controlBox.appendChild(input);
  return input;
}
```

Note, if you wanted to add labels to your input, you could modify the above slightly, like this:

```typescript
export function makeLabeledInput (labelText : string, inputType : string) : HTMLInputElement {
  let label = document.createElement('label');
  label.textContent = labelText;  
  let input = document.createElement('input');
  input.setAttribute('type',inputType);
  label.appendChild(input);
  controlBox.appendChild(label);
  return input;
}
```

Inputs work much like buttons, but instead of using the "click" event, we'll use the "change" event which fires each time the inputs value changes. We can then access the value using the value attribute of the input (or the `valueAsNumber` to get a numeric value).

The code below shows how I can set up both a size input and a color input:

```typescript
import {makeInput, makeLabeledInput, makeButton} from './controls';

let colorInput = makeInput('color');
colorInput.addEventListener(
  // when the color input changes...
  'change',
  function () { // do this function!
    // set stroke style to value of color input
    ctx.strokeStyle = colorInput.value;
  } // end function
); 

let sizeInput = makeLabeledInput('Size:','range');
sizeInput.setAttribute('max','50');
sizeInput.setAttribute('min','1');
sizeInput.addEventListener(
  'change',
  function () {
    ctx.lineWidth = sizeInput.valueAsNumber;
  }
)
```

### Possible extensions...

Saving drawing as a file - [stackexchange answer on this here](https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl)

[Drawing an Image onto a Canvas](https://www.youtube.com/watch?v=kbdQg7i4364)
