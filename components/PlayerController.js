class PlayerController {
  constructor(player, game) {
    this.player = player;
    this.game = game;

    this.yVelocity = 0;
    this.xVelocity = 0;

    this.grounded = false;
    this.dashing = false;
    this.doubleJumped = false;

    this.speed = 500;
    this.dashSpeed = 8;
    this.dashAccel = 1;
    this.dashTimer = 0;
    this.dashDuration = 30;

    this.animationLock = 0;

    this.attackEffect;

    this.jumpStrength = 8;
    this.gravity = 30;
    this.jumpDistance = 5;
  }

  jump() {
    if (inputManager.up) inputManager.upHold = true;
    if (inputManager.A) inputManager.AHold = true;
    if (this.animationLock <= 0) {
      this.player.state = 2;
      this.player.getCurrentAnimation().resetFrames();
    }
    this.yVelocity = -this.jumpStrength;
    this.grounded = false;
  }

  checkCollisions(){
    if (this.player.BB.x < 0) {
      this.player.x = 0 + (this.player.x - this.player.BB.x);
    }
    if (this.player.BB.x + this.player.BB.width > 2500) {
      this.player.x = 2500 - this.player.BB.width - (this.player.BB.x - this.player.x);
    }
  }

  updateState() {
    if (this.player.state == 4 && this.animationLock > 0) {
      // ANY LOCK OUT STATES HERE
    } else if (this.dashing) {

    } else {
      this.animationLock = 0;
      if (this.grounded) {
        //GROUNDED STATES
        this.player.state = 0;
        if (inputManager.right && !inputManager.left) {
          this.player.state = 1;
          this.player.facing = 0;
        }
        if (inputManager.left && !inputManager.right) {
          this.player.state = 1;
          this.player.facing = 1;
        }
      } else {
        //AIRBORNE STATES
        if (inputManager.right && !inputManager.left) {
          this.player.facing = 0;
        }
        if (inputManager.left && !inputManager.right) {
          this.player.facing = 1;
        }
        if ((inputManager.upHold||inputManager.AHold) && this.yVelocity < 0) { //High jump
          this.gravity = 20;
        } else this.gravity = 30;
        
        if (this.yVelocity >= 0) {
          this.player.state = 3;
        } else this.player.state = 2;
      }
    }
    //JUMPING
    if ((inputManager.up && !inputManager.upHold)||(inputManager.A && !inputManager.AHold)) {
      //START THE JUMP
      if (this.grounded) {
        this.jump();
      } else {
        if (!this.doubleJumped) {
          this.doubleJumped = true;
          this.jump();
        }
      }
    }
    //ATTACKING
    if (inputManager.B && this.animationLock <= 0) {
      this.player.state = 4;
      this.player.getCurrentAnimation().resetFrames();
      this.animationLock = this.player.getCurrentAnimation().totalTime - gameEngine.clockTick;
      let effect = new Effect(this.player.x + 57, this.player.y - 28, 'Kokoro', 600,
        this.player.facing, 5, 9
      )
      effect.displayX -= gameEngine.camera.x;
      effect.displayY -= (gameEngine.camera.y - 50);
      effect.id='playerAttackEffect'
      this.attackEffect = effect;
      gameEngine.addEntity(effect);
    }
  }

  updateMovement() {
    this.player.y += this.yVelocity;
    this.player.x += this.xVelocity;
    if (!this.grounded) {
      this.yVelocity += this.gravity * gameEngine.clockTick;
    }
    if (inputManager.right && !inputManager.left) {
      this.player.x += this.speed * gameEngine.clockTick;
    }
    if (inputManager.left && !inputManager.right) {
      this.player.x -= this.speed * gameEngine.clockTick;
    }
    //CHECK IF HIT FLOOR
    if (this.player.y + this.player.yBoxOffset > this.game.floor && !this.grounded && this.yVelocity != 0) {
      this.player.y = this.game.floor - this.player.yBoxOffset;
      this.yVelocity = 0;
      this.grounded = true;
      this.doubleJumped = false;
    }
    this.checkCollisions();
  }

  update() {
    // console.log(this.animationLock);
    if (this.animationLock > 0) this.animationLock -= gameEngine.clockTick;
    if (this.attackEffect) {
      this.attackEffect.displayX += this.player.delta.x;
      this.attackEffect.displayY += this.player.delta.y;
    }
    this.updateState();
    this.updateMovement();
  }
}
