class Koishi extends Character {
  constructor(game) {
    super("enemy", "Koishi", game, 300, 300, 280, game.player.x + 500, game.floor - 280, 25);
    this.facing = 1;
    this.setController(new KoishiPhase2(this, game));
    this.state = 0;
    this.displayX -= game.camera.x;
    this.invuln = false;
    this.phase = 0;


    this.health = 25;
  }

  loadAnimations() {
    //IDLE
    this.makeAnimation(0, 0, 0, 3, 6);
    //JUMP
    this.makeAnimation(1, 1, 0, 3, 9);
    this.makeAnimation(2, 1, 2, 1, 1);
    //LAND
    this.makeAnimation(3, 1, 3, 1, 1);
    //KNOCKBACK
    this.makeAnimation(4, 2, 0, 1, 1);

    //SLASH
    this.makeAnimation(5, 3, 0, 1, 1);
    this.makeAnimation(6, 3, 1, 1, 1);

    //SHOOT
    this.makeAnimation(7, 4, 0, 1, 1);
    this.makeAnimation(8, 4, 1, 1, 1);

    //SPIN
    this.makeAnimation(9, 5, 0, 4, 9);

    //POSE
    this.makeAnimation(10, 6, 0, 1, 1);

    //LOSE
    this.makeAnimation(20, 2, 1, 1, 1);
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
  hurt() {
    if (!this.dead() && !this.invuln) {
      this.health--;
      ASSET_MANAGER.playSound("enemy_damaged");
      if (this.game.player.x < this.x) {
        this.game.addEntity(new Effect(this.displayX + 40, this.displayY - 40, 'Hit', 300, 2, 3, 12));
      } else {
        this.game.addEntity(new Effect(this.displayX - 40, this.displayY - 40, 'Hit', 300, 1, 3, 12));
      }
    }
  }
  update(){
    // console.log(this.x + "," + this.y);
    // console.log(this.state);
    this.controller.update();
    this.updateBB();
    this.displayX = this.x - this.game.camera.x;
    this.displayY = this.y;
  }
  draw(ctx) {
    this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.displayX, this.displayY);
    
    if (this.game.boxView) {
      ctx.fillStyle = 'green';
      ctx.fillText(this.x + ", " + this.y, this.displayX, this.displayY + 300, 100);
      ctx.strokeStyle = "yellow";
      ctx.beginPath();

      ctx.rect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

      ctx.stroke();
    }
  }
}