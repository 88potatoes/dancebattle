let canvas1 = document.querySelector('.c1');
const BSIZE = 0.7 * window.innerWidth;
canvas1.width = BSIZE;
canvas1.height = BSIZE;
let img = document.createElement('img');
img.src = 'resources/pixil-frame-0.png';
c1 = canvas1.getContext('2d');


let mouse = {
    x: 0,
    y: 0
}
canvas1.addEventListener('mousemove', (e) => {
    mouse.x = e.x - canvas1.offsetLeft;
    mouse.y = e.y - canvas1.offsetTop;
});

let FPS = 60;
let timePerFrame = 1000 / FPS;
let now, then = Date.now();
let timeElapsed = 0;

function animateBottom() {
    now = Date.now();
    timeElapsed += now - then;
    then = now;
    if (timeElapsed > timePerFrame) {
        timeElapsed = 0;

        aBot();

        requestAnimationFrame(animateBottom);
        return;
    }
    requestAnimationFrame(animateBottom);
}

animateBottom();

function aBot() {
    c1.clearRect(0, 0, BSIZE, BSIZE);
    c1.fillStyle = `rgb(${mouse.x * 255 / BSIZE}, 0, ${mouse.y * 255 / BSIZE})`;
    c1.fillRect(0, 0, BSIZE, BSIZE);
    c1.drawImage(img, BSIZE / 2 - img.width / 2 , BSIZE / 2 - img.height / 2);

    // draw a circle
    c1.beginPath();
    c1.arc(70, 70, 40, 0, Math.PI * 2);
    c1.fillStyle = 'yellow';
    c1.fill();
    c1.closePath();
    
    let twidth = 100;
    let theight = twidth * img.height / img.width; 
    c1.drawImage(img, 70 - twidth / 2, 70 - theight / 2, twidth, theight);
}
