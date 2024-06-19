class KoishiPhase2 extends KoishiController {
    constructor(boss, game) {
        super(boss, game);
        this.timer = 1.5;
        this.attackDuration = 1.5;
        this.boss.phase = 2;
        this.boss.state = 3;
        this.attackEffect;
        this.attackCount = 0;
        this.shotCount = 0;
        this.shotTimer = 0;
        this.angle;
    }
    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Idle timer
            this.facePlayer();

            let roll = this.rollForAttack(4);
            // let roll = 3;
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
                    this.attack(5,.6); break;
                }
                case(2):{
                    this.attack(7,.5); break;
                }
                case(3):{
                    this.attack(9, 2);
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
                case(5):{
                    if (this.attackDuration < 0.1) {
                        this.xVelocity = this.forwards() * 1400;
                    }
                    break;
                }
                case(6):{
                    if (this.boss.facing == 0) {
                        let hitbox = new Hitbox(this.boss.x + (300+43- 193), this.boss.y, 193, 270, 0, this.game);
                        this.game.addEntity(hitbox);
                        if (this.xVelocity > 0) this.xVelocity -= 6000 * this.game.clockTick;
                        else this.xVelocity = 0;
                    } else {
                        let hitbox = new Hitbox(this.boss.x - 43, this.boss.y, 193, 270, 0, this.game);
                        this.game.addEntity(hitbox);
                        if (this.xVelocity < 0) this.xVelocity += 6000 * this.game.clockTick;
                        else this.xVelocity = 0;
                    }
                    this.attackEffect.x += this.xVelocity * gameEngine.clockTick;
                    this.attackEffect.displayX += this.xVelocity * gameEngine.clockTick;
                    break;
                }
                case(8): {
                    let speed = 1000;
                    if (this.shotTimer <= 0 && this.shotCount < 4) {
                        this.game.addEntity(new Projectile(this.boss.x, this.boss.y, 300, 300, 140,140,20,20,
                            speed, this.angle, null, 'Koishi', 0, this.game));
                        this.shotTimer = 0.05;
                        this.shotCount++;
                    } else {
                        this.shotTimer -= this.game.clockTick;
                    }
                    break;
                }
                case(9): {
                    if (this.attackDuration < 1 && this.attackDuration > 0.5) {
                        if (this.shotTimer <= 0) {
                            let speed = 750;
                            let angle = -90;
                            this.game.addEntity(new Projectile(this.boss.x, this.boss.y, 300, 300, 145,145,10,10,
                                speed, angle + this.shotCount * 20, null, 'Koishi', 2, this.game));
                            this.game.addEntity(new Projectile(this.boss.x, this.boss.y, 300, 300, 145,145,10,10,
                                speed, angle - this.shotCount * 20, null, 'Koishi', 3, this.game));
                            this.shotTimer = 0.05;
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
                case(5):{
                    this.attack(6,0.5);
                    // this.xVelocity = this.forwards() * 1200;
                    if (this.boss.facing == 0) {
                        this.attackEffect = new Effect(this.boss.x - this.game.camera.x + (300+57-500), this.boss.y - 23, "Koishi", 500, 
                            this.boss.facing, 1, 1);
                    } else {
                        this.attackEffect = new Effect(this.boss.x - this.game.camera.x - 57, this.boss.y - 23, "Koishi", 500, 
                            this.boss.facing, 1, 1);
                    }
                    this.attackEffect.duration = this.attackDuration;
                    this.game.addEntity(this.attackEffect);
                    break;
                }
                case(6): {
                    if (this.attackCount < 1) { //DOUBLE SWING
                        this.attack(5,.4);
                        this.facePlayer();
                        this.attackCount++;
                    } else {
                        this.timer = 1;
                        this.boss.state = 0;
                        this.attackCount = 0;
                    }
                    break;
                }
                case(7): {
                    this.angle = this.targetPlayerAngle();
                    this.attack(8, 0.3);
                    this.shotCount = 0;
                    this.shotTimer = 0;
                    break;
                }
                case(8): {
                    if (this.attackCount < 2) { //Triple shot
                        this.attack(7,.2);
                        this.facePlayer();
                        this.attackCount++;
                    } else {
                        this.timer = 1;
                        this.boss.state = 0;
                        this.attackCount = 0;
                        this.shotCount = 0;
                        this.shotTimer = 0;
                    }
                    break;
                }
                default: {
                    // this.effectSpawn = false;
                    this.attackCount = 0;
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