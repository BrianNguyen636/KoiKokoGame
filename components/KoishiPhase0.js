class KoishiPhase0 extends KoishiController {
    constructor(boss, game) {
        super(boss, game);
        this.timer = 1;
        this.attackDuration = 0;
        this.attackEffect;
    }
    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Idle timer
            this.facePlayer();

            let roll = this.rollForAttack(3);
            // let roll = 2;
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
                case(7): {
                    let speed = 700;
                    let angle = this.targetPlayerAngle();
                    this.game.addEntity(new Projectile(this.boss.x, this.boss.y, 300, 300, 140,140,20,20,
                        speed, angle, null, 'Koishi', 0, this.game));
                    this.game.addEntity(new Projectile(this.boss.x, this.boss.y, 300, 300, 140,140,20,20,
                        speed, angle - 30, null, 'Koishi', 0, this.game));
                    this.game.addEntity(new Projectile(this.boss.x, this.boss.y, 300, 300, 140,140,20,20,
                        speed, angle + 30, null, 'Koishi', 0, this.game));    
                    this.attack(8, 1);
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