const canvas = document.querySelector('.canvas');
const CAN_SIZE = 600;
canvas.height = CAN_SIZE;
canvas.width = CAN_SIZE;

let c = canvas.getContext('2d');

class Circle {
    constructor() {
        this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${(Math.random() * 0.8) + 0.2})`;
        this.r = Math.random() * 20 + 10;
        this.x = Math.random() * (CAN_SIZE - 2 * this.r) + this.r;
        this.dx = 5 * (Math.random() - 0.5);
        this.y = Math.random() * (CAN_SIZE - 2 * this.r) + this.r;
        this.dy = 5 * (Math.random() - 0.5);

    }

    circleAnimate() {
        this.x += this.dx;
        this.y += this.dy;

        if (!this.cleared && this.x + this.r < CAN_SIZE && this.x - this.r > 0 && this.y + this.r < CAN_SIZE && this.y - this.r > 0) {
            this.cleared = true;
        }

        if (this.cleared) {
            if (this.x + this.r >= CAN_SIZE || this.x - this.r <= 0) {
                this.dx *= -1;
                this.cleared = false;
            }
        
            if (this.y + this.r >= CAN_SIZE || this.y - this.r <= 0) {
                this.dy *= -1;
                this.cleared = false;
            }
        }
    }

    circleRender() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }
}

const circles = [];
for (let i = 0; i < 80; i++) {
    circles.push(new Circle());
}

const animate = () => {
    requestAnimationFrame(animate);
    
    c.clearRect(0, 0, CAN_SIZE, CAN_SIZE);

    for (let i = 0, n = circles.length; i < n; i++) {
        circles[i].circleAnimate();
        circles[i].circleRender();
    }
}

animate();