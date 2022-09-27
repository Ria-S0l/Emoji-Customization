let app : HTMLDivElement = document.querySelector('#app');
export let canvas = document.createElement('canvas');

canvas.style.backgroundImage = "url('https://preview.redd.it/s1hyxgcwvqj51.png?auto=webp&s=cddab1cb306fd19446f20fddd91e4671dfca99a6')";
canvas.style.backgroundRepeat = "no-repeat";
canvas.style.backgroundSize = "cover";


export let ctx = canvas.getContext('2d');
export let width = 717;
export let height = 717;
canvas.width = width;
canvas.height = height;
app.style.width = `${width}px`;
app.style.height = `${height}px`;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;

app.appendChild(canvas);


//canvas.style.backgroundColor = ''
