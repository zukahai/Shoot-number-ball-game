rCircle = 0;
class ball{
    constructor (game) {
        this.game = game;
        this.x = XXX;
        this.y = YYY;
        this.dx = 0;
        this.dy = 0;
        this.start = false;
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
                for (let j = 0; j < N; j++) {
                    var k = this.check(Data[i][j]);
                    // console.log(k);
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
                    }
                }
            
            this.x += this.dx;
            this.y += this.dy;
            if (this.y > game_H) {
                if (XX == -1) {
                    XX = 0;
                    XXX = this.x;
                    console.log(XXX);
                }
                this.start = false;
                this.x = XXX;
                this.y = YYY;
            }
        }
    }

    check(rtl) {
        let X = this.x + this.dx;
        let Y = this.y + this.dy;
        if (!rtl.alive)
            return -1;
        if (X >= rtl.xx && X <= rtl.xx + WidthRectangle && Y >= rtl.yy && Y <= rtl.yy + HeightRectangle)  {
            // var m1 = Math.min(Math.abs(X - rtl.xx), Math.abs(X - rtl.xx - WidthRectangle));
            // var m2 = Math.min(Math.abs(Y - rtl.yy), Math.abs(Y - rtl.yy - HeightRectangle));
            // if (m1 < m2)
            //     return 1;
            // return 2;
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

    draw() {
        this.game.context.beginPath();
        this.game.context.arc(this.x , this.y, rCircle, 0, Math.PI*2, false);
        this.game.context.fillStyle = 'cyan';
        this.game.context.fill();
        this.game.context.closePath()
    }
}