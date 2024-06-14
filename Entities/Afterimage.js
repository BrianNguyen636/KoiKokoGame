class Afterimage {
    constructor(x, y, name, squareSize, number, game) {
        Object.assign(this, {x,y, name, squareSize, number, game});
        this.id = "effect";
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + this.name + "Ghost.png");
        this.removeFromWorld = false;
        this.alpha = 1;
        this.width = this.squareSize;
        this.height = this.squareSize;
        this.fadeSpeed = 4.5;
        this.displayX = this.x;
        this.displayY = this.y;
    };

    update() {
        this.alpha -= this.fadeSpeed * this.game.clockTick;
        if (this.alpha <= 0) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(this.spritesheet,
                this.width * this.number, 0,
                this.width, this.height,
                this.displayX, this.displayY,
                this.width,this.height
                );
            ctx.globalAlpha = 1;
        }
    };
}