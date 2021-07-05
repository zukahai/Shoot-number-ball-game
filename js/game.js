game_W = 0, game_H = 0;
XXX = 0, YYY = 0;
start = false;
dx = 0, dy = 0;
Nball = 10;
index = 0;
Data = [];
N = 6;
M = 0;
WidthRectangle = 0;
HeightRectangle = 0;
count = 0, count2 = 0;
class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.render();

        WidthRectangle = game_W / 6;
        HeightRectangle = 2 * WidthRectangle / 3;
        Data = [];
        M = Math.floor(1.5 * game_H / (game_W / N)) + 1;
        for (let i = 0; i < M; i++)
            Data[i] = [0, 0, 0, 0, 0, 0];

        let xx = 0, yy = 0, color = 0;
        for (let i = 0; i < M; i++) {
            yy = i * HeightRectangle;
            for (let j = 0; j < N; j++) {
                color = Math.floor(Math.random()*16777215).toString(16);
                xx = j * WidthRectangle;
                Data[i][j] = {xx, yy, color, alive : false};
            }
        }

        for (let i = 0; i < M / 3; i++) {
            yy = i * HeightRectangle;
            for (let j = 0; j < N; j++) {
                if (Math.random() < 0.5)
                    Data[i][j].alive = true;
            }
        }
            
        console.log(Data);

        this.b = [];
        for (let i = 0; i < Nball; i++) 
            this.b[i] = new ball(this);
        
        this.loop();

        this.listenKeyboard();
        this.listenMouse();
    }

    listenKeyboard() {
        document.addEventListener("keydown", evt => {
            
        })
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            var x = evt.x;
            var y = evt.y;
            dx = x - XXX;
            dy = y - YYY;
            var range = Math.sqrt(dx * dx + dy * dy);
            dx /= (range / (this.getWidth() / 1.5));
            dy /= (range / (this.getWidth() / 1.5));
            for (let i = 0; i < Nball; i++) {
                this.b[i].dx = dx;
                this.b[i].dy = dy;
            }
            start = true;
            count2 = count + 1;
            console.log(x, ' ', y);
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        this.render();
        count++;
        if (start) {
            if (count2 == count) {
                if (index < Nball) {
                    this.b[index++].start = true;
                    count2 = count + 1;
                }
            }
        }
        for (let i = 0; i < Nball; i++)
            this.b[i].update();
    }

    render() {
        if (game_W != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            XXX = game_W / 2;
            YYY = game_H - this.getWidth();
        }
    }

    draw() {
        this.clearScreen();
        this.drawArrayRectangle();
        for (let i = 0; i < Nball; i++)
            this.b[i].draw();    
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0 , 0, game_W, game_H); 
    }

    drawArrayRectangle() {
        for (let i = 0; i < M; i++)
            for (let j = 0; j < N; j++)
                if (Data[i][j].alive) {
                    // console.log(Data[i][j]);
                    this.context.fillStyle = '#' + Data[i][j].color;
                    this.context.fillRect(Data[i][j].xx , Data[i][j].yy, WidthRectangle, HeightRectangle);
                }
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 300);
    }

}

var g = new game();