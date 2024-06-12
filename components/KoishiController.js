class KoishiController {
    constructor(boss, game) {
        this.boss = boss;
        this.game = game;
        this.player = game.player;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    update() {
        this.boss.y += this.yVelocity * this.game.clockTick; 
        this.boss.x += this.xVelocity * this.game.clockTick;
        // if (this.boss.y + this.boss.yBoxOffset >= 700) { //GROUND COLLISION
        //     this.boss.y = 700 - this.boss.yBoxOffset;
        //     this.yVelocity = 0;
        // }
        this.boss.state = 0;
    }
}