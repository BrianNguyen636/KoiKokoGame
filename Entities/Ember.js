class Ember extends Projectile {
    constructor(x, y, angle) {
        super(x, y, 300, 300, 140,140,20,20,
            800, angle, null, 'Koishi', 1, gameEngine);
        this.bounces = 5;
        this.trailTimer = 0;
    }
    behavior() {
        //left collision
        if (this.bounces > 0) {
            if (this.x + this.hitboxX <= 0 || this.x + this.hitboxX + this.hitboxWidth >= 2500) {
                console.log("bounce");
                this.angle = -this.angle + 180;
                this.bounces--;
                this.calculateVelocity();
            }
            if (this.y + this.hitboxY <= 0 || this.y + this.hitboxY + this.hitboxHeight >= this.game.floor) {
                console.log("bounce");
                this.angle = 360 - (this.angle);
                this.bounces--;
                this.calculateVelocity();
            }
        }
        console.log(this.trailTimer)
        if (this.trailTimer <= 0) {
            this.game.addEntity(new Projectile(this.x, this.y, this.width, this.height, 135, 135,
                30,30,0,0,0.2, 'Koishi', 4, this.game
            ));
            this.trailTimer = 0.05;
        } else {
            this.trailTimer -= this.game.clockTick;
        }
    }
}