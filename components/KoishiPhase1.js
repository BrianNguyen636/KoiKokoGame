class KoishiPhase1 extends KoishiController {
    constructor(boss, game) {
        super(boss, game);
        this.timer = 1.5;
        this.attackDuration = 1.5;
        this.attackEffect;
        this.boss.state = 3;
        this.declared = false;
    }
    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Idle timer
            this.facePlayer();

            // let roll = this.rollForAttack(3);
            let roll = 1;
            switch(roll) {
                case(0): {
                    this.attack(1);
                    // ASSET_MANAGER.playSound("Whoosh");
                    this.yVelocity = -1500;
                    let variance = Math.floor(Math.random() * 400);
                    this.xVelocity = (1 - this.boss.facing * 2) * (400 + variance);
                    break;
                }
                case(1): {
                    this.attack(9,1);
                    break;
                }
            }
        }
        if (this.attackDuration > 0 || this.timer > 0) { //What happens during an attack
            switch(this.boss.state) {
                case(10):{ //DECLARATION

                    break;
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 0) { //What happens after attack
            switch(this.boss.state) {
                case(3):{
                    if (!this.declared) {
                        this.attack(10,2);
                        this.game.uiManager.setCutIn(2);
                    } else {
                        this.timer = 1;
                        this.boss.state = 0;
                        this.xVelocity = 0;
                    }
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