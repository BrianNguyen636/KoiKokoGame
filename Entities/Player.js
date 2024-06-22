class Player extends Character {
  constructor(game) {
    super("player", "Kokoro", game, 500, 500, 443, (2500 - 300) / 2 - 300, game.floor - 443, 10);
    this.facing = 0;
    this.setController(new PlayerController(this, game));
    this.hurtState = 6;

    //debug
    // this.health = 2; 
  }

  loadAnimations() {
    this.makeAnimation(0, 0, 0, 4, 6); //IDLE
    this.makeAnimation(1, 1, 0, 6, 9); //WALK
    this.makeAnimation(2, 2, 0, 2, 3); //JUMP
    this.makeAnimation(3, 2, 2, 1, 1); //FALL
    this.makeAnimation(4, 3, 0, 5, 9); //ATTACK
    this.makeAnimation(5, 4, 0, 5, 9); //DASH
    this.makeAnimation(6, 5, 0, 1, 1); //HURT
    this.makeAnimation(7, 6, 0, 1, 1); //LOSE
  }

  updateBB() {
    // switch (this.state) {
    //   default:
    //     if (this.facing == 0) {
    //     } else {
    //     }
    //     break;
    // }
    this.BB = new BoundingBox(this.x + 220, this.y + 249, 60, 120);
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
    if (this.controller.invuln > 0 && !this.dead()) ctx.globalAlpha = 0.5;
    this.animations[this.facing][this.state].drawFrame(
      this.game.clockTick,
      ctx,
      this.displayX,
      this.displayY
    );
    ctx.globalAlpha = 1;

    // ctx.fillStyle='green';
    // ctx.fillText(this.x + ", " + this.y, this.displayX + 200, this.displayY + 500, 100);

    if (this.game.boxView) {
      ctx.strokeStyle = "yellow";
      ctx.beginPath();

      ctx.rect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

      ctx.stroke();

      if (this.controller.attackBox != null) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(this.controller.attackBox.x - this.game.camera.x, this.controller.attackBox.y, 
          this.controller.attackBox.width, this.controller.attackBox.height);
        ctx.stroke();
      }

    }
  }
}
