let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}
let maxRadius = 40;
let minRadius = 30;
let circleArray = [];
let finished = [];

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

let colorAray = ['#F2F2F2', '#BFBFBF', '#8C8C8C', '#595959', '#404040', '#6E7474',
    '#DCDEDA', '#08171C', '#4B5663', '#3F5358', '#474544', '#E1DBD9', '#C7BFBD',
    '#4D4B4A', '#918C8A', '#555C6C', '#2C393F', '#142020', '#CCCCC0', '#E7F0F2',
    '#A6A6A6', '#262626', '#F2F2F2', '#8C8C8C', '#595959', '#B3B3B3', '#737373',
    '#FFFFFF'];

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = Math.ceil(Math.random() * 10);
        this.color = colorAray[Math.ceil(Math.random() * colorAray.length)];

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            c.strokeStyle = `white`;
            c.stroke();
            c.fill()
            c.fillStyle = this.color;
        };
        this.update = function () {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            //inneractivity
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
                mouse.y - this.y < 50 && mouse.y - this.y > -50
                && this.radius < maxRadius) {
                this.radius += 30
            }
            this.draw()
        };
    }
}

for (let i = 0; i < Math.random() * 0.15 * innerWidth; i++) {
    let radius = 30;
    let x = Math.random() * (innerWidth - 2 * radius) + radius;
    let y = Math.random() * (innerHeight - 2 * radius) + radius;
    let dx = 5 * (Math.random() - 0.5);
    let dy = 5 * (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius))
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(1, 0, innerWidth, innerHeight);

    circleArray.forEach(el => {
        if (el.radius > minRadius) {
            if (el.dx < 0 || el.dy < 0 || el.dx > 0 || el.dy > 0) {
                el.x = el.y = -100;
                el.dx = 0;
                el.dy = 0;
                finished.push(el)

                if (circleArray.length === finished.length) {
                    document.location.reload()
                }
            }
        };
    });
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        ;
    }
}

animate();