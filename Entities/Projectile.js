class Projectile {
    constructor(x, y, width, height, 
        hitboxX, hitboxY, hitboxWidth, hitboxHeight, 
        speed, angle, lifespan, name, number, game) {
        Object.assign(this, {x,y,width,height,hitboxX, hitboxY, hitboxWidth, hitboxHeight, 
            speed,angle,lifespan,name,number,game});
        this.id = "projectile"
        this.calculateVelocity();
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + this.name + "Projectiles.png");
        this.updateHitbox();
        this.displayX = this.x - this.game.camera.x;
        this.displayY = this.y;

    };
    calculateVelocity() {
        this.radians = this.angle * Math.PI / 180;
        this.xVelocity = this.speed * Math.cos(this.radians);
        this.yVelocity = -this.speed * Math.sin(this.radians);
    };
    updateHitbox(){
        this.game.addEntity(new Hitbox(this.x + this.hitboxX, this.y + this.hitboxY,
            this.hitboxWidth, this.hitboxHeight, 0, this.game));
    };
    update() {
        this.x += this.xVelocity * this.game.clockTick;
        this.y += this.yVelocity * this.game.clockTick;
        this.displayX += this.xVelocity * this.game.clockTick;
        this.displayY += this.yVelocity * this.game.clockTick;
        if (this.x + this.width < 0 || this.x > 2500) {
            this.removeFromWorld = true;
        }
        if (this.y > 1600 || this.y < -800) {
            this.removeFromWorld = true;
        }
        this.updateHitbox();
        this.behavior();
        if (this.lifespan != null) {
            if (this.lifespan <= 0) {
                this.removeFromWorld = true;
            } else this.lifespan -= this.game.clockTick;
        }
    };
    behavior(){};

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.save();
            ctx.translate(this.displayX + this.width / 2, this.displayY + this.height / 2);
            ctx.rotate(-this.radians);
            ctx.drawImage(this.spritesheet,
                0, this.height * this.number,
                this.width, this.height,
                -this.width / 2, -this.height / 2, 
                this.width, this.height,
            );
            ctx.restore();
        }
    };
}