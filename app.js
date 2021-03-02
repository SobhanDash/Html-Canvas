// grab the canvas
const canvas = document.querySelector('#draw');
//drawing on HTML requries a context, 2D or 3D, this is where we do all our drawing
const ctx = canvas.getContext('2d');
//increase canvas width and height according to screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//context manipulation
ctx.strokeStyle = '#BADA55';     //starting color
ctx.lineJoin = 'round';         //when two lines meet whats the shape of the end of corner  
ctx.lineCap = 'round';          //whats the shape of the line caps(ends)
ctx.lineWidth = '50';
//ctx.globalCompositeOperation = 'addition';    //global 

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
    if(!isDrawing) return;      //stops the function when mouse is not down
    // console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    //actual drawing mechanism
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];         //destructing the array

    hue++;
    if(hue >=360){
        hue = 0;
    }
    //increase and decrease the line width
    if(ctx.lineWidth >=50 || ctx.lineWidth <= 1){
        direction = !direction;
    }
    if(direction){
        ctx.lineWidth++;
    }else{
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];  
}) ;       //starts drawing

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false)         //stops when mouse is freed
canvas.addEventListener('mouseout', () => isDrawing = false)        //stops when cursor goes out of canvas
