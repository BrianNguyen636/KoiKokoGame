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
    curveShots() {
        this.game.entities.forEach(e=>{
            if (e.id == 'rShot') {
                e.angle += 30 * this.game.clockTick;
                e.calculateVelocity();
            } else if (e.id == 'lShot') {
                e.angle -= 30 * this.game.clockTick;
                e.calculateVelocity();
            }
        });
    }

    behavior() {
        this.curveShots();

        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Idle timer
            this.facePlayer();

            let roll = this.rollForAttack(2);

            switch(roll) {
                case(0): {
                    this.attack(9, 2.5);
                    break;
                }
                case(1):{
                    this.attack(1);
                    // ASSET_MANAGER.playSound("Whoosh");
                    this.yVelocity = -1500;
                    let variance = Math.floor(Math.random() * 400);
                    this.xVelocity = (1 - this.boss.facing * 2) * (400 + variance);
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
                case(9):{
                    if (this.attackDuration < 1.5) {
                        if (this.shotTimer <= 0 && this.shotCount < 3) {
                            let angle = -90;
                            if (this.shotCount % 2 == 1) {
                                angle += 36;
                            }
                            for (let i = 0; i < 5; i++) {
                                let rightShot = new Projectile(this.boss.x, this.boss.y, 300, 300, 140,140,20,20,
                                    700, angle + 72 * i, null, 'Koishi', 1, gameEngine);
                                rightShot.id = "rShot";
                                let leftShot = new Projectile(this.boss.x, this.boss.y, 300, 300, 140,140,20,20,
                                    700, angle + 72 * i, null, 'Koishi', 0, gameEngine);
                                leftShot.id = "lShot";
                                this.game.addEntity(rightShot);
                                this.game.addEntity(leftShot);
                            }
                            this.shotTimer = 0.5;
                            this.shotCount++;
                        } else {
                            this.shotTimer -= this.game.clockTick;
                        }
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
                        this.game.uiManager.setCutIn(2, "Instinct \"Release of the Id\"");
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
                    this.timer = 1;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                    break;
                }
            }
        }
    }
}