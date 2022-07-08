const canvas = document.querySelector('.canvas');
const CAN_SIZE = 800;
canvas.height = CAN_SIZE;
canvas.width = CAN_SIZE;

console.log(canvas);

let c = canvas.getContext('2d');
console.log(c);

for (let j = 0; j < 3; j++) {
    c.beginPath();
    c.moveTo(Math.random() * CAN_SIZE, Math.random() * CAN_SIZE);
    for (let i = 0; i < 20; i++) {
        c.lineTo(Math.random() * CAN_SIZE, Math.random() * CAN_SIZE);
    }
    c.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
    c.closePath();
    c.fill();
}