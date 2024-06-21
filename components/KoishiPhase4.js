class KoishiPhase4 extends KoishiController {
    constructor(boss, game) {
        super(boss, game);
        this.timer = 1.5;
        this.attackDuration = 1.5;
        this.boss.phase = 4;
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
            // let roll = 2;
            switch(roll) {
                case(0): {
                    this.attack(1);
                    // ASSET_MANAGER.playSound("Whoosh");
                    this.yVelocity = -1500;
                    this.xVelocity = (1 - this.boss.facing * 2) * (500);
                    break;
                }
                case(1):{
                    this.invis = false;
                    this.attack(5,.6); break;
                }
                case(2):{
                    this.attack(7,.5); break;
                }
                case(3):{
                    this.invis = true;
                    this.attack(5, 1);
                    this.attackCount = 1;
                    break;
                }
            }
        }
        if (this.attackDuration > 0 || this.timer > 0) { //What happens during an attack
            switch(this.boss.state) {
                case(1):{
                    
                    break;
                }
                case(9):{
                    if (this.shotTimer <= 0) {
                        let speed = 700;
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

                    if (this.yVelocity >= 0 && this.boss.y >= this.game.floor - this.boss.yBoxOffset) {
                        this.attackDuration = 0;
                        this.xVelocity = 0;
                    }
                    break;
                }
                case(5):{
                    if (this.invis) {
                        if (this.boss.alpha < 0) {
                            this.boss.alpha = 0;
                            this.boss.invuln = true;
                            if (this.boss.facing == 0) {
                                this.boss.facing = 1;
                                this.boss.x = this.game.player.getCenter().x + (250 + 150 - 300);
                            } else {
                                this.boss.facing = 0;
                                this.boss.x = this.game.player.getCenter().x - (250 + 150);
                            }
                        } else if (this.boss.alpha > 0 && this.attackDuration > 0.5) {
                            this.boss.alpha -= this.game.clockTick * 2;
                        }
                        if (this.attackDuration <= 0.5) {
                            if (this.boss.alpha < 1) this.boss.alpha += this.game.clockTick * 2;
                            this.boss.invuln = false;
                            if (this.boss.alpha > 1) {
                                this.boss.alpha = 1;
                                this.invis = false;
                            }
                        }
                    }
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
                case(7): {
                    if (this.invis) {
                        if (this.boss.alpha < 0) {
                            this.boss.alpha = 0;
                            this.boss.invuln = true;
                            if (this.boss.facing == 0) {
                                this.boss.facing = 1;
                                this.boss.x = this.game.player.getCenter().x + (250 + 150 - 300);
                            } else {
                                this.boss.facing = 0;
                                this.boss.x = this.game.player.getCenter().x - (250 + 150);
                            }
                        } else if (this.boss.alpha > 0 && this.attackDuration > 0.5) {
                            this.boss.alpha -= this.game.clockTick * 2;
                        }
                        if (this.attackDuration <= 0.5) {
                            if (this.boss.alpha < 1) this.boss.alpha += this.game.clockTick * 2;
                            this.boss.invuln = false;
                            if (this.boss.alpha > 1) {
                                this.boss.alpha = 1;
                                this.invis = false;
                            }
                        }
                    }
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

                }
                case(2):{
                    this.attack(9, 5);
                    break;
                }
                case(9): { //LAND
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
                    if (this.attackCount < 3) { //Quad shot
                        if (this.attackCount == 1 && Math.random() < 0.5) {
                            this.invis = true;
                            this.attack(7,1.1);
                        } else {
                            this.attack(7,.2);
                        }
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
                    this.invis = false;
                    this.boss.alpha = 1;
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