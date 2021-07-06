rCircle = 0;
class ball{
    constructor (game) {
        this.game = game;
        this.x = XXX;
        this.y = YYY;
        this.dx = 0;
        this.dy = 0;
        this.start = false;
        this.end = false;
        rCircle = this.game.getWidth() / 5;
    }

    init() {

    }

    update() {
        if (this.start) {
            if (this.x + dx - rCircle < 0 || this.x + dx + rCircle > game_W)
                this.dx = -this.dx;
            if (this.y + dy - rCircle < 0)
                this.dy = -this.dy;
            for (let i = 0; i < M; i++)
                for (let j = 0; j < N; j++) 
                    if (Data[i][j].type == 1){
                        var k = this.checkRectangle(Data[i][j]);
                        if (k != -1) {
                            if (k == 1)
                            this.dx = -this.dx;
                            if (k == 2)
                                this.dy = -this.dy;
                            if (k == 3) {
                                this.dx = -this.dx;
                                this.dy = -this.dy;
                            }
                            Data[i][j].value--;
                            if (Data[i][j].value <= 0)
                                Data[i][j].alive = false;
                            score ++;
                        }
                    } else {
                        if (this.checkCircle(Data[i][j])) {
                            Data[i][j].alive = false;
                            NballTemp++;
                        }
                    }
            
            this.x += this.dx;
            this.y += this.dy;
            if (this.y + dy > YYY) {
                if (XX == -1) {
                    XX = 0;
                    XXX = this.x;
                }
                console.log('XXX = ', XXX);
                this.start = false;
                this.y = YYY;
            }
        } else if (this.end) {
            if (Math.abs(this.x - XXX) > game_W / 200) {
                if (this.x < XXX)
                    this.x += Math.abs(this.x - XXX) / 30;
                else 
                    this.x -= Math.abs(this.x - XXX) / 30;
            } else {
                this.x = XXX;
                this.end = false;
            }
        }
    }

    checkRectangle(rtl) {
        let X = this.x + this.dx;
        let Y = this.y + this.dy;
        if (!rtl.alive)
            return -1;
        if (X >= rtl.xx && X <= rtl.xx + WidthRectangle && Y >= rtl.yy && Y <= rtl.yy + HeightRectangle)  {
            X -= this.dx;
            Y -= this.dy;
            if (X >= rtl.xx && X <= rtl.xx + WidthRectangle)
                return 2;
            if (Y >= rtl.yy && Y <= rtl.yy + HeightRectangle)
                return 1;
            return 3;
        }
        return -1;
    }

    checkCircle(rtl) {
        if (!rtl.alive)
            return false;
        let X = this.x + this.dx;
        let Y = this.y + this.dy;
        let x = rtl.xx + WidthRectangle / 2;
        let y = rtl.yy + HeightRectangle / 2;
        let rg = this.range(X, Y, x, y);
        return (rg <= 2.5 * rCircle);
    }

    range(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    draw() {
        this.game.context.beginPath();
        this.game.context.arc(this.x , this.y, rCircle, 0, Math.PI * 2, false);
        this.game.context.fillStyle = 'cyan';
        this.game.context.fill();
        this.game.context.closePath()
    }
}