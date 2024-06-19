class KoishiPhase1 extends KoishiController {
    constructor(boss, game) {
        super(boss, game);
        this.timer = 1.5;
        this.attackDuration = 1.5;
        this.attackEffect;
        this.boss.state = 3;
        this.boss.phase = 1;
        this.declared = false;
        this.attackCount = 0;
    }

    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Idle timer
            this.facePlayer();

            let roll;
            // let roll = this.rollForAttack(3);
            if (this.attackCount == 2) {
                this.attackCount = 0;
                roll = 0;
            } else {
                roll = 1;
                this.attackCount++;
            }

            switch(roll) {
                case(0): {
                    this.attack(1);
                    // ASSET_MANAGER.playSound("Whoosh");
                    this.yVelocity = -1500;
                    let variance = Math.floor(Math.random() * 400);
                    this.xVelocity = (1 - this.boss.facing * 2) * (400 + variance);
                    break;
                }
                case(1):{
                    this.attack(7,.5); break;
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
                case(1): { //JUMP LOOP START
                    this.attack(2, 20);
                     break; 
                }
                case(2): { //LAND
                    // ASSET_MANAGER.playSound("Thud");
                    this.attack(3,0.25);
                    break;
                }
                case(3):{
                    if (!this.declared) {
                        this.declared = true;
                        this.attack(10,2);
                        this.game.uiManager.setCutIn(2, "Rekindled \"Embers of Love\"");
                    } else {
                        this.timer = 1;
                        this.boss.state = 0;
                        this.xVelocity = 0;
                    }
                    break;
                }
                case(7): {
                    this.attack(8,1.0);
                    let random = this.rollForAttack(3);
                    let angle = 0 + this.boss.facing * 180;
                    switch(random){
                        case 0: angle += 40; break;
                        case 1: angle += 60; break;
                    }
                    this.game.addEntity(new Ember(this.boss.x, this.boss.y, angle));
                    this.game.addEntity(new Ember(this.boss.x, this.boss.y, angle + 180));
                    break;
                }

                default: {
                    // this.effectSpawn = false;
                    this.boss.invuln = false;
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