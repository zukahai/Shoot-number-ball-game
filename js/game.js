game_W = 0, game_H = 0;
XXX = 0, YYY = 0;
XX = -1;
start = false;
dx = 0, dy = 0;
cs = 0;
xEnd = 0, yEnd = 0;
Nball = NballTemp = 3;
index = 0;
Data = [];
turn = 0;
touchCheck = false;
xtouch = 0, yTouch = 0;
score = 0;
N = 6;
M = 12;
let x3 = 1;
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
                Data[i][j] = {xx, yy, color, alive : false, value: Math.floor(Math.random() * 3 + 1), type : 1};
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
            if (x > XXX) {
                if ((game_W - XXX) / (x - XXX) * (YYY - y) < HeightRectangle) {
                    x = game_W;
                    y = game_H - 1.5 * HeightRectangle;
                }
            } else {
                if (XXX / (XXX - x) * (YYY - y) < HeightRectangle) {
                    x = 0;
                    y = game_H - 1.5 * HeightRectangle;
                }
            }
            xEnd = x + 100 * (x - XXX), yEnd = x + 100 * (y - YYY);
        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            if (x > XXX) {
                if ((game_W - XXX) / (x - XXX) * (YYY - y) < HeightRectangle) {
                    x = game_W;
                    y = game_H - 1.5 * HeightRectangle;
                }
            } else {
                if (XXX / (XXX - x) * (YYY - y) < HeightRectangle) {
                    x = 0;
                    y = game_H - 1.5 * HeightRectangle;
                }
            }
            touchCheck = false;
            this.solve(x, y);
        })
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            var x = evt.touches[0].pageX - (document.documentElement.clientWidth - game_W) / 2;
            var y = evt.touches[0].pageY;
            if (x > XXX) {
                if ((game_W - XXX) / (x - XXX) * (YYY - y) < HeightRectangle) {
                    x = game_W;
                    y = game_H - 1.5 * HeightRectangle;
                }
            } else {
                if (XXX / (XXX - x) * (YYY - y) < HeightRectangle) {
                    x = 0;
                    y = game_H - 1.5 * HeightRectangle;
                }
            }
            xEnd = x + 100 * (x - XXX), yEnd = x + 100 * (y - YYY);
            xtouch = x;
            yTouch = y;
        })

        document.addEventListener("touchstart", evt => {
            touchCheck = true;
            var x = evt.touches[0].pageX - (document.documentElement.clientWidth - game_W) / 2;
            var y = evt.touches[0].pageY;
            if (x > XXX) {
                if ((game_W - XXX) / (x - XXX) * (YYY - y) < HeightRectangle) {
                    x = game_W;
                    y = game_H - 1.5 * HeightRectangle;
                }
            } else {
                if (XXX / (XXX - x) * (YYY - y) < HeightRectangle) {
                    x = 0;
                    y = game_H - 1.5 * HeightRectangle;
                }
            }
            
            xEnd = x + 100 * (x - XXX), yEnd = x + 100 * (y - YYY);
            xtouch = x;
            yTouch = y;
        })

        document.addEventListener("touchend", evt => {    
            touchCheck = false;
            this.solve(xtouch, yTouch);
        })

        this.context.restore();
    }

    loop() {
        for (let  i = 0; i < x3; i++) {
            this.update();
            this.draw();
        }
        
        setTimeout(() => this.loop(), 1);
    }

    solve(x, y) {
        if (start) {
            x3 = 3;
            return;
        }
            
        XX = -1;
        dx = x - XXX;
        dy = y - YYY;
        var range = Math.sqrt(dx * dx + dy * dy);
        dx /= (range / (4 * x3));
        dy /= (range / (4 * x3));
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
                    this.b[index].start = true;
                    this.b[index++].end = true;
                    count2 = count + 7;
                }
            }
        }
        for (let i = 0; i < Nball; i++)
            this.b[i].update();
        if (this.checkFinish()) {
            index = 0;
            if (XX == 0) {
                this.matrixDown();
                x3 = 1;
            }
                
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
                window.alert("You lose!" + "\n" + "Your score: " + score);
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
            Data[0][j] = {xx, yy: 0, color, alive : false, value: Math.floor(Math.random() * 2 * turn / 3 + turn / 2 + 1)};
            if (Math.random() < 0.3) {
                Data[0][j].alive = true;
                Data[0][j].type = 1;
            } else if (Math.random() < 0.11) {
                Data[0][j].alive = true;
                Data[0][j].type = 2;
            }
            let Jindex = Math.floor(Math.random() * 100000) % N;
            Data[0][Jindex].alive = true;
            Data[0][Jindex].type = 1;
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
        if (touchCheck && !start)
            this.drawLine(XXX, YYY, xEnd, yEnd);
        this.drawArrayRectangle();
        this.context.fillStyle = this.setColor(Nball);
        this.context.fillText(Nball, game_W - WidthRectangle, YYY + HeightRectangle / 4);
        this.context.fillStyle = this.setColor(Math.floor(score / 100));
        this.context.fillText(score, WidthRectangle / 7, YYY + HeightRectangle / 4);
        this.context.fillStyle = "cyan"; 
        for (let i = 0; i < Nball; i++)
            this.b[i].draw();
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
        this.context.font = 0.6 * Math.sqrt(HeightRectangle * WidthRectangle) + 'px Calibri';
        for (let i = 0; i < M; i++)
            for (let j = 0; j < N; j++)
                if (Data[i][j].alive) {
                    if (Data[i][j].type == 1) {
                        Data[i][j].color = this.setColor(Data[i][j].value);
                        this.context.fillStyle = Data[i][j].color;
                        this.context.fillRect(Data[i][j].xx , Data[i][j].yy, WidthRectangle, HeightRectangle);
                        this.context.fillStyle = "#ffffff";
                        this.context.fillText(Data[i][j].value, Data[i][j].xx + this.margin(Data[i][j].value) , Data[i][j].yy + 0.75 * HeightRectangle);
                    } else if (Data[i][j].type == 2) {
                        this.context.beginPath();
                        this.context.fillStyle = '#00FF00';
                        this.context.arc(Data[i][j].xx + WidthRectangle / 2, Data[i][j].yy + HeightRectangle / 2, 1.5 * rCircle, 0, Math.PI * 2, false);
                        this.context.fill();
                        this.context.closePath()
                    }
                }
    }

    setColor(N) {
        let ccc = ["#ACFA66", "#11F92A", "#5EAB18", "#20F8F8", "#10A9A9", "#4C59EA", "#2834AE", "#B378E0", "#8E31D4", "#5E1197", "#F34FF0", "#F806F4", "#F03143", "#FC0A0A"];
        let c = 10;
        let c2 = 10;
        for (let i = 0; i < ccc.length; i++) {
            if (N < c)
                return ccc[i];
            c += c2++;
        }
        return  ccc[ccc.length - 1];
    }

    margin(number) {
        number = Math.floor(number);
        if (number < 10)
            return 0.4 * WidthRectangle;
        if (number < 100)
            return 0.23 * WidthRectangle;
        if (number < 1000)
            return 0.13 * WidthRectangle;
        return 0;
    }

    getWidth() {
        var area = game_W * game_H;
        return Math.sqrt(area / 300);
    }
}

var g = new game();