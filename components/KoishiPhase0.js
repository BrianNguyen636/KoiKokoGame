class KoishiPhase0 extends KoishiController {
    constructor(boss, game) {
        super(boss, game);
        this.timer = 0.5;
        this.attackDuration = 0;
    }
    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Walk from Idle timer
            this.facePlayer();

            // let roll = this.rollForAttack(5);
            let roll = 0;
            switch(roll) {
                case(0): {
                    this.attack(1);
                    // ASSET_MANAGER.playSound("Whoosh");
                    this.yVelocity = -1500;
                    this.xVelocity = (1 - this.boss.facing * 2) * 800;
                    break;
                }
            }
        }
        if (this.attackDuration > 0 || this.timer > 0) { //What happens during an attack
            switch(this.boss.state) {
                case(1, 2): {
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
                case(1): { 
                    this.attack(2, 20);
                     break; 
                }
                case(2): {
                    // ASSET_MANAGER.playSound("Thud");
                    this.attack(3,0.25);
                    break;
                }
                default: {
                    // this.effectSpawn = false;
                    this.shotTimer = 0;
                    this.shotCount = 0;
                    this.timer = 1;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                    break;
                }
            }
        }
    }
}