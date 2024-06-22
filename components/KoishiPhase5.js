class KoishiPhase5 extends KoishiController {
    constructor(boss, game) {
        super(boss, game);
        this.timer = 1.5;
        this.attackDuration = 1.5;
        this.attackEffect;
        this.boss.state = 3;
        this.boss.phase = 5;
        this.declared = false;
        this.attackCount = 0;
    }

    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Idle timer
            this.facePlayer();

            let roll;
            // let roll = this.rollForAttack(3);
            if (this.attackCount == 3) {
                this.attackCount = 0;
                roll = 0;
            } else {
                roll = 1;
                this.attackCount++;
            }

            switch(roll) {
                case(0): {
                    this.timer = 1;
                    break;
                }
                case(1):{
                    this.attack(1);
                    ASSET_MANAGER.playSound("danmakushoot");
                    this.yVelocity = -1500;
                    // let variance = Math.floor(Math.random() * 400);
                    this.xVelocity = (1 - this.boss.facing * 2) * (200 + 100 * this.attackCount);
                    break;
                }
            }
        }
        if (this.attackDuration > 0 || this.timer > 0) { //What happens during an attack
            switch(this.boss.state) {
                // case(1, 2): {
                //     // if (this.yVelocity >= 0 && this.boss.y >= this.game.floor - this.boss.yBoxOffset) {
                //     //     this.attackDuration = 0;
                //     //     this.xVelocity = 0;
                //     // }
                //     if (this.attackDuration) {
                //         this.attack(9, 5);
                //     }
                //     break;
                // }
                case(9):{
                    if (this.shotTimer <= 0) {
                        let speed = 700;
                        let angle = -90;
                        this.game.addEntity(new Projectile(this.boss.x, this.boss.y, 300, 300, 145,145,10,10,
                            speed, angle + this.shotCount * 20, null, 'Koishi', 2, this.game));
                        this.game.addEntity(new Projectile(this.boss.x, this.boss.y, 300, 300, 145,145,10,10,
                            speed, angle - this.shotCount * 20, null, 'Koishi', 3, this.game));
                        this.shotTimer = 0.04;
                        this.shotCount++;
                        ASSET_MANAGER.playSound("danmakushoot");
                    } else {
                        this.shotTimer -= this.game.clockTick;
                    }

                    if (this.yVelocity >= 0 && this.boss.y >= this.game.floor - this.boss.yBoxOffset) {
                        this.attackDuration = 0;
                        this.xVelocity = 0;
                    }
                    break;
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 0) { //What happens after attack
            switch(this.boss.state) {
                case(1): { //JUMP LOOP START

                }
                case(2):{
                    this.attack(9, 5);
                    break;
                }
                case(9): { //LAND
                    ASSET_MANAGER.playSound("land");
                    this.attack(3,0.25);
                    break;
                }
                case(3):{
                    if (!this.declared) {
                        this.declared = true;
                        this.attack(10,2);
                        this.game.uiManager.setCutIn(2, "Depths \"Genetics of the Subconscious\"");
                        ASSET_MANAGER.playSound("spellcard");
                    } else {
                        this.timer = 1;
                        this.boss.state = 0;
                        this.xVelocity = 0;
                        this.shotTimer = 0;
                        this.shotCount = 0;
                    }
                    break;
                }
                default: {
                    // this.effectSpawn = false;
                    this.boss.invuln = false;
                    this.shotTimer = 0;
                    this.shotCount = 0;
                    this.timer = 0.5;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                    break;
                }
            }
        }
    }
}