class Effect {
    constructor(x, y, name, squareSize, number, frames, fps) {
        Object.assign(this, {x,y, name, squareSize, number, frames, fps});
        this.id = "effect";
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + this.name + "Effects.png");
        this.removeFromWorld = false;
        this.alpha = 1;
        this.width = this.squareSize;
        this.height = this.squareSize;
        this.animation = new Animator(this.spritesheet, 0, number * this.squareSize, this.squareSize, this.squareSize, this.frames, this.fps); 
        // console.log(this.animation);
        this.duration = this.animation.totalTime - gameEngine.clockTick;
        // this.fadeSpeed = 1.5;
        this.displayX = this.x;
        this.displayY = this.y;
    }

    update() {
        this.duration-= gameEngine.clockTick;
        if (this.duration <= 0) this.removeFromWorld = true;
        // this.alpha -= this.fadeSpeed * this.game.clockTick;
        // if (this.alpha <= 0) {
        //     this.removeFromWorld = true;
        // }
    };

    draw(ctx) {
        this.animation.drawFrame(
            gameEngine.clockTick,
            ctx,
            this.displayX,
            this.displayY
          );
    };
}