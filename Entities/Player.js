class Player extends Character {
  constructor(game) {
    super("player", "Kokoro2", game, 500, 500, 443, (2500 - 300) / 2, game.floor - 443, 5);
    this.facing = 0;
    this.setController(new PlayerController(this, game));
  }

  loadAnimations() {
    this.makeAnimation(0, 0, 0, 4, 6); //IDLE
    this.makeAnimation(1, 0, 0, 4, 6); //IDLE
    this.makeAnimation(2, 0, 0, 4, 6); //IDLE
    this.makeAnimation(3, 0, 0, 4, 6); //IDLE

    // this.makeAnimation(1, 1, 0, 6, 9); //WALK
    // this.makeAnimation(2, 2, 0, 2, 3); //JUMP
    // this.makeAnimation(3, 2, 2, 1, 1); //FALL
    this.makeAnimation(4, 3, 0, 5, 9);
  }

  updateBB() {
    // switch (this.state) {
    //   default:
    //     if (this.facing == 0) {
    //     } else {
    //     }
    //     break;
    // }
    this.BB = new BoundingBox(this.x + 206, this.y + 229, 60, 150);
  }

  update() {
    // console.log(this.x + ", " + this.y);

    let lastX = this.x;
    let lastY = this.y;
    this.controller.update();
    this.updateBB();
    this.delta = {
      x: this.x - lastX,
      y: this.y - lastY
    }
  }



  draw(ctx) {
    // this.drawShadow(ctx);
    this.animations[this.facing][this.state].drawFrame(
      this.game.clockTick,
      ctx,
      this.displayX,
      this.displayY
    );
    ctx.fillStyle='green';
    ctx.fillText(this.x + ", " + this.y, this.displayX + 200, this.displayY + 500, 100);

    if (this.game.boxView) {
      ctx.strokeStyle = "yellow";
      ctx.beginPath();

      ctx.rect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

      ctx.stroke();
    }
  }
}
