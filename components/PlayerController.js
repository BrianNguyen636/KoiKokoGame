class PlayerController {
  constructor(player, game) {
    this.player = player;
    this.game = game;

    this.yVelocity = 0;
    this.xVelocity = 0;

    this.grounded = false;
    this.dashing = false;
    this.airdash = false;
    this.doubleJumped = false;

    this.speed = 550;
    this.dashSpeed = 900;
    this.dashDuration = 0;

    // this.hurtDuration = 0;

    this.animationLock = 0;

    this.attackEffect;
    this.attackBox = null;

    this.jumpStrength = 1200;
    this.gravity = 4200;
    this.highJumpModifier = 0.65;

    this.invuln = 0;
  }

  attack() {
    this.player.state = 4;
    this.player.getCurrentAnimation().resetFrames();
    this.animationLock = this.player.getCurrentAnimation().totalTime - gameEngine.clockTick;
    let effect;
    if (this.player.facing == 0) {
      effect = new Effect(this.player.x + 57, this.player.y - 28, 'Kokoro', 600,
        this.player.facing, 5, 9)
    } else {
      effect = new Effect(this.player.x + (500-57-600), this.player.y - 28, 'Kokoro', 600,
      this.player.facing, 5, 9)
    }
    effect.displayX -= gameEngine.camera.x;
    effect.displayY -= (gameEngine.camera.y - 50);
    effect.id='playerAttackEffect'
    this.attackEffect = effect;
    gameEngine.addEntity(effect);
    this.damaged = false;
    ASSET_MANAGER.playSound("attack1");
  }
  attackState() {
    if (this.animationLock < 3/5 * this.player.getCurrentAnimation().totalTime && !this.damaged) {
      if (this.player.facing == 0) {
        this.attackBox = new BoundingBox(this.player.x + 194,this.player.y+74,300,400);
      } else {
        this.attackBox = new BoundingBox(this.player.x +(500 - 194 - 300),this.player.y+74,300,400);
      }
      if (this.attackBox.collide(gameEngine.boss.BB)) { //BOSS ATTACKED
        gameEngine.boss.hurt();
        this.damaged = true;
      }
    }
    // console.log(this.attackBox);
  }
  dashState() {
    this.dashDuration -= gameEngine.clockTick;
    if (!this.ghostTimer || this.ghostTimer <= 0) {
      this.ghostTimer = (0.075)
      let ghost = new Afterimage(this.player.x - gameEngine.camera.x, this.player.y, 'Kokoro', 500, this.player.facing, gameEngine);
      gameEngine.addEntity(ghost);
    }
    this.ghostTimer -= gameEngine.clockTick;
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
    this.dashDuration = 0;
  }

  knockback(other) {
    this.grounded = false;
    this.yVelocity = -1400;
    this.dashDuration = 0;
    this.doublejump = true;
    if (this.player.BB.midX > other.BB.midX) {
      this.xVelocity = 400;
    } else {
      this.xVelocity = -400;
    }
  }

  hurt(other) {
    if (this.invuln <= 0 && !this.player.dead()) {
      this.player.health--;
      // this.hurtDuration = 1;
      this.player.state = this.player.hurtState;
      this.knockback(other);
      this.invuln = 2;
      if (this.player.dead()) {
        ASSET_MANAGER.playSound("ko");
      } else {
        ASSET_MANAGER.playSound("player_damaged");
      }
      this.game.addEntity(new Effect(this.player.displayX + 100, this.player.displayY + 100, 'Hit', 300, 0, 3, 6));
    }
  }

  checkCollisions(){
    //FLOOR COLLISION
    if (this.player.y + this.player.yBoxOffset > this.game.floor && !this.grounded && this.yVelocity != 0) {
      this.player.y = this.game.floor - this.player.yBoxOffset;
      this.yVelocity = 0;
      this.xVelocity = 0;
      this.grounded = true;
      this.airdash = true;
      this.doubleJumped = false;
    }
    //WALL COLLISIONS
    if (this.player.BB.x < 0) {
      this.player.x = 0 + (this.player.x - this.player.BB.x);
    }
    if (this.player.BB.x + this.player.BB.width > 2500) {
      this.player.x = 2500 - this.player.BB.width - (this.player.BB.x - this.player.x);
    }
    //ENEMY COLLISIONS
    gameEngine.entities.forEach(e=> {
      if (e.id == 'attack') {
        if (this.player.BB.collide(e.BB) && this.invuln <= 0) {
            this.hurt(e);
        }
      }
    })
  }

  updateState() {
    
    if (this.player.state != this.player.hurtState && !this.game.dialog) { //If not control locked
      //JUMPING
      if ((inputManager.up && !inputManager.upHold)||(inputManager.A && !inputManager.AHold)) {
        //START THE JUMP
        if (this.grounded) {
          this.jump();
        } else if (!this.doubleJumped) {
          this.doubleJumped = true;
          this.jump();
        }
      }
      //ATTACKING
      if (inputManager.B && this.animationLock <= 0 && this.dashDuration <= 0) {
        this.attack();
      }
      //DASHING
      if (inputManager.C && !inputManager.CHold && this.dashDuration <= 0 && this.animationLock <= 0) { //DASH
        if (this.airdash || this.grounded) {
          if (inputManager.right && !inputManager.left) {this.player.facing = 0;}
          if (inputManager.left && !inputManager.right) {this.player.facing = 1;}
          inputManager.CHold = true;
          if (!this.grounded)this.airdash = false;
          ASSET_MANAGER.playSound("dash");
          this.player.state = 5;
          this.dashDuration = 0.5;
          this.yVelocity = 0;
          this.player.getCurrentAnimation().resetFrames();

        }
      }
    }
    // ANY LOCK OUT STATES HERE
    if (this.player.state == this.player.hurtState) { //HURT
      if (this.yVelocity == 0) {
        this.player.state = 0;
        if (this.player.dead()) {
          this.player.state = this.player.hurtState + 1;
          this.game.defeat = true;
        }
      } 
    } else if (this.player.state == 4 && this.animationLock > 0) {//ATTACKING
      this.attackState();
    } else if (this.dashDuration > 0) {
      this.dashState();
    } else {
      this.animationLock = 0;
      this.attackBox = null;
      this.dashing = false;
      if (this.grounded) {
        //GROUNDED STATES
        this.player.state = 0;
        if (!this.game.dialog) {
          if (inputManager.right && !inputManager.left) {
            this.player.state = 1;
            this.player.facing = 0;
          }
          if (inputManager.left && !inputManager.right) {
            this.player.state = 1;
            this.player.facing = 1;
          }
        }
      } else {
        //AIRBORNE STATES
        if (inputManager.right && !inputManager.left) {this.player.facing = 0;}
        if (inputManager.left && !inputManager.right) {this.player.facing = 1;}
        if (this.yVelocity >= 0) {
          this.player.state = 3;
        } else this.player.state = 2;
      }
    }
  }


  updateMovement() {
    this.player.y += this.yVelocity * gameEngine.clockTick;
    this.player.x += this.xVelocity * gameEngine.clockTick;

    if (!this.grounded && this.dashDuration <= 0) { //GRAVITY
      if ((inputManager.upHold||inputManager.AHold) && this.yVelocity < 0) { //High jump
        this.yVelocity += this.gravity * gameEngine.clockTick * this.highJumpModifier;
      } else this.yVelocity += this.gravity * gameEngine.clockTick;
    }

    if (this.dashDuration > 0) { //DASH
      if (this.player.facing == 0) {
        this.player.x += this.dashSpeed * gameEngine.clockTick;
      } else {
        this.player.x -= this.dashSpeed * gameEngine.clockTick;
      }
    } else if (this.player.state != this.player.hurtState && !this.game.dialog){ //NORMAL MOVEMENT
      if (inputManager.right && !inputManager.left) {
        this.player.x += this.speed * gameEngine.clockTick;
      }
      if (inputManager.left && !inputManager.right ) {
        this.player.x -= this.speed * gameEngine.clockTick;
      }
    }
    this.checkCollisions();
  }

  update() {
    // console.log(this.animationLock);
    if (this.animationLock > 0) this.animationLock -= gameEngine.clockTick;
    //IF PLAYER ISNT IN KNOCKBACK
    if (this.invuln > 0 && this.player.state != this.player.hurtState) this.invuln -= gameEngine.clockTick;

    if (this.attackEffect) {
      this.attackEffect.displayX += this.player.delta.x;
      this.attackEffect.displayY += this.player.delta.y;
    }
    // if (this.attackBox) {
    //   this.attackBox.x += this.player.delta.x;
    //   this.attackBox.y += this.player.delta.y;
    // }
    if (this.player.state != this.player.hurtState + 1) {
      this.updateState();
      this.updateMovement();
    }
  }
}
