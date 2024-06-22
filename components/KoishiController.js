class KoishiController {
    constructor(boss, game) {
        this.boss = boss;
        this.game = game;
        this.player = game.player;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.gravity = 3000;
        this.knockbackState = 4;
        this.loseState = 20;
    }

    knockback(knockbackState) {
        if (this.boss.state != knockbackState && this.boss.state != this.loseState) { //initial knockback
            this.boss.invuln = true;
            this.boss.alpha = 1;
            this.game.clearProjectiles();
            this.attackDuration = 4;
            this.timer = 4;
            // this.setBossTime();
            this.antiGrav = false;
            // this.game.combat = false
            ASSET_MANAGER.playSound("ko");
            this.facePlayer();
            this.boss.state = knockbackState;
            this.xVelocity = this.forwards() * -400; 
            this.yVelocity = -1100;
        } else if (this.boss.state == knockbackState) {
            if (this.yVelocity >= 0 && this.boss.y == 700 - this.boss.yBoxOffset) {
                // ASSET_MANAGER.playSound("Thud");
                this.xVelocity = 0;
                if (this.boss.phase < 5) {
                    
                    switch(this.boss.phase) {
                        case(0): { 
                            this.boss.setController(new KoishiPhase1(this.boss, this.game));
                        } break;
                        case(1): { 
                            this.boss.setController(new KoishiPhase2(this.boss, this.game));
                        } break;
                        case(2): { 
                            this.boss.setController(new KoishiPhase3(this.boss, this.game));
                        } break;
                        case(3): { 
                            this.boss.setController(new KoishiPhase4(this.boss, this.game));
                        } break;
                        case(4): { 
                            this.boss.setController(new KoishiPhase5(this.boss, this.game));
                        } break;
                    }
                    this.boss.health = this.boss.maxHealth;
                } else if (!this.game.victory) {
                    this.boss.state = this.loseState;
                    this.game.victory = true;
                    this.game.dialog = true;
                    this.game.timer.track = false;
                }
            }
        }
    };

    forwards() {
        return -(-1 + this.boss.facing * 2);
    }
    targetPlayerAngle() {
        let target = {
            x:this.game.player.BB.midX,
            y:this.game.player.BB.midY
        }
        let pCenter = this.boss.getCenter();
        let delta_x = (target.x) - (pCenter.x)
        let delta_y = (target.y) - (pCenter.y)
        let theta_radians = Math.atan2(delta_y, delta_x)
        return -theta_radians*180/Math.PI;
    }
    rollForAttack(attacks) {
        // if (attacks < 3) throw new Error("Not enough attacks!");
        let roll = this.lastRoll;
        while (roll == this.lastRoll
            //  || roll == this.lastLastRoll
            ) {
            roll = Math.floor(Math.random() * attacks);
        }
        // this.lastLastRoll = this.lastRoll;
        this.lastRoll = roll;
        return roll;
    }
    
    facePlayer() {
        if (this.boss.BB.midX < this.player.BB.midX) {
            this.boss.facing = 0;
        } else this.boss.facing = 1; 
    };

    attack(state, duration) {
        this.boss.state = state;
        this.boss.getCurrentAnimation().resetFrames();
        if (duration == undefined) {
            this.attackDuration = this.boss.getCurrentAnimation().totalTime - 1 * this.game.clockTick;
        } else {
            this.attackDuration = duration;
        }
    };

    collisions(){
        if (this.boss.y + this.boss.yBoxOffset >= gameEngine.floor) { //GROUND COLLISION
            this.boss.y = gameEngine.floor - this.boss.yBoxOffset;
            this.yVelocity = 0;
        }
        let offset = this.boss.BB.x - this.boss.x
        if (this.boss.BB.x <= 0) { //LEFT COLLISION
            this.boss.x = 0 - offset;
            this.boss.displayX = this.boss.x - gameEngine.camera.x
        }
        if (this.boss.BB.right >= 2500) { //RIGHT COLLISION
            this.boss.x = 2500 - offset - this.boss.BB.width;
            this.boss.displayX = this.boss.x - gameEngine.camera.x
        }
        if (this.boss.BB.collide(gameEngine.player.BB) && !this.boss.dead() && !this.boss.invuln) {
            gameEngine.player.controller.hurt(this.boss);
        }
    }

    update() {


        if (!this.antiGrav) this.yVelocity += this.gravity * this.game.clockTick; //Gravity

        this.boss.y += this.yVelocity * this.game.clockTick; 
        this.boss.x += this.xVelocity * this.game.clockTick;

        this.collisions();
        if (!this.game.dialog) {
            if (this.timer > 0) this.timer -= this.game.clockTick;
            if (this.attackDuration > 0) this.attackDuration -= this.game.clockTick;
            if (!this.boss.dead()) {
                this.behavior();
            } else {
                this.knockback(this.knockbackState);
            }
        }
    };
    
}