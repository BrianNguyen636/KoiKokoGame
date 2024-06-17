class Koishi extends Character {
  constructor(game) {
    super("enemy", "Koishi", game, 300, 300, 280, game.player.x + 300, game.floor - 280, 25);
    this.facing = 1;
    this.setController(new KoishiPhase0(this, game));
    this.state = 0;
    this.displayX -= game.camera.x;
  }

  loadAnimations() {
    //IDLE
    this.makeAnimation(0, 0, 0, 3, 3);
    //JUMP
    this.makeAnimation(1, 1, 0, 3, 9);
    this.makeAnimation(2, 1, 2, 3, 1);
    //LAND
    this.makeAnimation(3, 1, 3, 4, 1);

    //SLASH
    this.makeAnimation(5, 3, 0, 1, 1);
    this.makeAnimation(6, 3, 1, 2, 1);

    //SHOOT
    this.makeAnimation(7, 4, 0, 1, 1);
    this.makeAnimation(8, 4, 1, 2, 1);


  }
  updateBB() {
    // switch (this.state) {
    //   default:
    //     if (this.facing == 0) {
    //     } else {
    //     }
    //     break;
    // }
    this.BB = new BoundingBox(this.x + 105, this.y + 72, 90, 170);
  }
  update(){
    // console.log(this.x + "," + this.y);
    this.controller.update();
    this.updateBB();
    this.displayX = this.x - this.game.camera.x;
    this.displayY = this.y;
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