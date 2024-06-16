class KoishiController {
    constructor(boss, game) {
        this.boss = boss;
        this.game = game;
        this.player = game.player;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.gravity = 3000;

        this.phase = 0
    }

    knockback(knockbackState) {
        if (this.boss.state < knockbackState) { //initial knockback
            // this.setBossTime();
            this.antiGrav = false;
            // this.game.timer.timerRun = false;
            // this.game.combat = false
            // ASSET_MANAGER.playSound("KO");
            this.facePlayer();
            this.boss.state = knockbackState;
            this.xVelocity = this.forwards() * -400; 
            this.yVelocity = -700;
        } else if (this.boss.state == knockbackState) {
            if (this.yVelocity >= 0 && this.boss.y == 700 - this.boss.yBoxOffset) {
                // ASSET_MANAGER.playSound("Thud");
                this.boss.state++;
                this.xVelocity = 0;
            }
        }
    };

    forwards() {
        return -(-1 + this.boss.facing * 2);
    }
    rollForAttack(attacks) {
        if (attacks < 3) throw new Error("Not enough attacks!");
        let roll = this.lastRoll;
        while (roll == this.lastRoll || roll == this.lastLastRoll) {
            roll = Math.floor(Math.random() * attacks);
        }
        this.lastLastRoll = this.lastRoll;
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
            this.boss.x = 0 - offset - gameEngine.camera.x;
        }
        if (this.boss.BB.right >= 2500) { //RIGHT COLLISION
            this.boss.x = 2500 - offset - this.boss.BB.width - gameEngine.camera.x;
        }
    }

    update() {
        if (this.timer > 0) this.timer -= this.game.clockTick;
        if (this.attackDuration > 0) this.attackDuration -= this.game.clockTick;

        if (!this.antiGrav) this.yVelocity += this.gravity * this.game.clockTick; //Gravity

        this.boss.y += this.yVelocity * this.game.clockTick; 
        this.boss.x += this.xVelocity * this.game.clockTick;

        this.collisions();

        if (!this.boss.dead()) {
            this.behavior();
        } else {
            this.knockback(this.knockbackState);
        }
    };
    
}