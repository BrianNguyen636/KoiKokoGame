class Hitbox {
    constructor(x, y, width, height, lifespan, game) {
        Object.assign(this, {x,y,width,height,lifespan,game});
        this.id = "attack";
        this.removeFromWorld = false;
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x,this.y,this.width,this.height);
    };

    update() {
        this.updateBB();
        // console.log(this.x+","+this.y);
        if (this.lifespan <= 0) {
            this.removeFromWorld = true;
        } else this.lifespan -= this.game.clockTick;
    };

    draw(ctx) {
        if (this.game.boxView) {
            let box = this.BB;
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.rect(box.x - this.game.camera.x, box.y, box.width, box.height);
            ctx.stroke();
        }
    };
}
