game_W = 0, game_H = 0;
XXX = 0, YYY = 0;
XX = -1;
start = false;
dx = 0, dy = 0;
cs = 0;
xEnd = 0, yEnd = 0;
Nball = 3;
NballTemp = 3;
index = 0;
Data = [];
turn = 0;
touchCheck = false;
score = 0;
N = 6;
M = 12;
cl = ['#FFFF66', '#33FF66', '0099FF', '#FF6600', '#FF0066', '#00EE00'];
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

        WidthRectangle = game_W / N;
        HeightRectangle = game_H / (M + 1);
        Data = [];
        for (let i = 0; i < 2 * M; i++)
            Data[i] = [0, 0, 0, 0, 0, 0];

        let xx = 0, yy = 0, color = 0;
        for (let i = 0; i < 2 * M; i++) {
            yy = i * HeightRectangle;
            for (let j = 0; j < N; j++) {
                color = Math.floor(Math.random() * 16777215 / 2 + 16777215 / 2).toString(16);
                xx = j * WidthRectangle;
                Data[i][j] = {xx, yy, color, alive : false, value: Math.floor(Math.random() * 2 + 1), type : 1};
            }
        }

        for (let i = 0; i < M / 3; i++) {
            yy = i * HeightRectangle;
            for (let j = 0; j < N; j++) {
                if (Math.random() < 0.2)
                    Data[i][j].alive = true;
                else if (Math.random() < 0.1) {
                    Data[i][j].alive = true;
                    Data[i][j].type = 2;
                }
            }
        }

        this.b = [];
        for (let i = 0; i < Nball; i++) 
            this.b[i] = new ball(this);
        
        this.loop();

        this.listenMouse();
        this.listenTouch();
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            touchCheck = true;
        })
        
        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            xEnd = x + 100 * (x - XXX), yEnd = x + 100 * (y - YYY);
        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            touchCheck = false;
            this.solve(x, y);
        })
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            
        })

        document.addEventListener("touchstart", evt => {
            
        })

        document.addEventListener("touchend", evt => {    
            
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 1);
    }

    solve(x, y) {
        if (start)
            return;
        XX = -1;
        dx = x - XXX;
        dy = y - YYY;
        var range = Math.sqrt(dx * dx + dy * dy);
        dx /= (range / (this.getWidth() / 10));
        dy /= (range / (this.getWidth() / 10));
        for (let i = 0; i < Nball; i++) {
            this.b[i].dx = dx;
            this.b[i].dy = dy;
        }
        start = true;
        count2 = count + 1;
    }

    update() {
        this.render();
        count++;
        if (start) {
            if (count2 == count) {
                if (index < Nball) {
                    this.b[index++].start = true;
                    count2 = count + 10;
                }
            }
        }
        for (let i = 0; i < Nball; i++)
            this.b[i].update();
        if (this.checkFinish()) {
            index = 0;
            if (XX == 0)
                this.matrixDown();
            XX = -1;
            start = false;
            for (let i = Nball; i < NballTemp; i++)
                this.b[i] = new ball(this);
            Nball = NballTemp;
        }
    }

    matrixDown() {
        turn++;
        for (let j = 0; j < N; j++) 
            if (Data[M - 1][j].alive && Data[M - 1][j].type == 1) {
                window.alert("You lose!");
                location.reload();
            }
        for (let i = M - 1; i > 0; i--)
            for (let j = 0; j < N; j++) {
                Data[i][j].color = Data[i - 1][j].color;
                Data[i][j].alive = Data[i - 1][j].alive;
                Data[i][j].value = Data[i - 1][j].value;
                Data[i][j].type = Data[i - 1][j].type;
            }
        for (let j = 0; j < N; j++) {
            let color = Math.floor(Math.random()*16777215 / 2 + 16777215 / 2).toString(16);
            let xx = j * WidthRectangle;
            Data[0][j] = {xx, yy: 0, color, alive : false, value: Math.floor(Math.random() * turn / 3 + turn / 3 + 1)};
            if (Math.random() < 0.3) {
                Data[0][j].alive = true;
                Data[0][j].type = 1;
            } else if (Math.random() < 0.1) {
                Data[0][j].alive = true;
                Data[0][j].type = 2;
            }
        }
    }

    render() {
        if (game_W / document.documentElement.clientWidth != cs || game_H != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            M++;
            if (this.canvas.width / N < (3 / 2) * this.canvas.height / M) {
                M = Math.floor(this.canvas.height / (2 / 3 * this.canvas.width / N));
            } else if (this.canvas.width > 2 * N * this.canvas.height / M)
                this.canvas.width = (3 / 2) * N * this.canvas.height / M;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            cs = game_W / document.documentElement.clientWidth;
            XXX = game_W / 2;
            YYY = game_H - game_H / (2 * M);
            M--;
        }
    }

    checkFinish() {
        for (let i = 0; i < Nball; i++)
            if (this.b[i].start == true)
                return false;
        return true;
    }

    draw() {
        this.clearScreen();
        if (touchCheck)
            this.drawLine(XXX, YYY, xEnd, yEnd);
        this.drawArrayRectangle();
        for (let i = 0; i < Nball; i++)
            this.b[i].draw();
        this.context.fillStyle = "cyan";
        this.context.fillText(Nball, game_W - WidthRectangle, YYY + HeightRectangle / 4);
        this.context.fillText("Score: " + score, WidthRectangle / 7, YYY + HeightRectangle / 4); 
    }

    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.strokeStyle  = "red";
        this.context.lineWidth = WidthRectangle / 20;
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0 , 0, game_W, game_H); 
    }

    drawArrayRectangle() {
        this.context.font = WidthRectangle / 1.5 + 'px Calibri';
        for (let i = 0; i < M; i++)
            for (let j = 0; j < N; j++)
                if (Data[i][j].alive) {
                    if (Data[i][j].type == 1) {
                        this.context.fillStyle = '#' + Data[i][j].color;
                        this.context.fillRect(Data[i][j].xx , Data[i][j].yy, WidthRectangle, HeightRectangle);
                        this.context.fillStyle = "#000000";
                        this.context.fillText(Data[i][j].value, Data[i][j].xx + this.margin(Data[i][j].value) , Data[i][j].yy + HeightRectangle / 1.3);
                    } else if (Data[i][j].type == 2) {
                        this.context.beginPath();
                        this.context.arc(Data[i][j].xx + WidthRectangle / 2, Data[i][j].yy + HeightRectangle / 2, 1.5 * rCircle, 0, Math.PI*2, false);
                        this.context.fillStyle = '#00FF00';
                        this.context.fill();
                        this.context.closePath()
                    }
                }
    }

    margin(number) {
        number = Math.floor(number);
        if (number < 10)
            return WidthRectangle / 2.65;
        if (number < 100)
            return this.getWidth() / 4.5;
        if (number < 1000)
            return 0;
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 300);
    }
}

var g = new game();