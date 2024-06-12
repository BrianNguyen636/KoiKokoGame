class Koishi extends Character {
  constructor(game) {
    super("enemy", "Koishi", game, 300, 300, 280, game.player.x + 300, game.floor - 280, 100);
    this.facing = 1;
    this.setController(new KoishiController(this, game));
    this.state = 0;
    this.displayX -= game.camera.x;
  }

  loadAnimations() {
    this.makeAnimation(0, 0, 0, 3, 3); //IDLE
    // this.makeAnimation(1, 1, 0, 6, 9); //WALK
    // this.makeAnimation(2, 2, 0, 2, 3); //JUMP
    // this.makeAnimation(3, 2, 2, 1, 1); //FALL
  }
  updateBB() {
    // switch (this.state) {
    //   default:
    //     if (this.facing == 0) {
    //     } else {
    //     }
    //     break;
    // }
    this.BB = new BoundingBox(this.x + 105, this.y + 42, 90, 230);
  }
  update(){
    // console.log(this.x + "," + this.y);
    this.controller.update();
    this.updateBB();
  }
  draw(ctx) {
    this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.displayX, this.displayY);
    ctx.fillStyle = 'green';
    ctx.fillText(this.x + ", " + this.y, this.displayX, this.displayY + 300, 100);

    if (this.game.boxView) {
      ctx.strokeStyle = "yellow";
      ctx.beginPath();

      ctx.rect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

      ctx.stroke();
    }
  }
}