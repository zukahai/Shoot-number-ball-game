class ball{
    constructor (game) {
        this.game = game;
        this.x = XXX;
        this.y = YYY;
        this.dx = 0;
        this.dy = 0;
        this.start = false;
    }

    init() {

    }

    update() {
        if (this.start) {
            this.x += this.dx;
            this.y += this.dy;
            if (this.x < 0 || this.x > game_W)
                this.dx = -this.dx;
            if (this.y < 0 || this.y > game_H)
                this.dy = -this.dy;
        }
    }

    draw() {
        this.game.context.beginPath();
        this.game.context.arc(this.x , this.y, this.game.getWidth() / 5, 0, Math.PI*2, false);
        this.game.context.fillStyle = 'cyan';
        this.game.context.fill();
        this.game.context.closePath()
    }
}