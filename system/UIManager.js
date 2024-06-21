class UIManager {
    constructor(game) {
        this.game = game;
        this.entities = game.entities;
        this.playerHealth;
        this.bossHealth;
        this.healthIcon = ASSET_MANAGER.getAsset("./assets/Health.png");
        this.alpha = 0;
        this.frameTimer = 0;
        this.fps = 0;
        this.frameCount = 0;
        // this.tip = "error";
        this.cutInDuration = 0;
    }
    // update() {
    //     this.playerHealth = this.game.player.health;
    //     this.bossHealth = this.game.boss.health;
    // }
    setCutIn(duration, name) {
        this.cutInAlpha = 0;
        this.cutInX = 1280;
        this.cutInY = 800;
        this.cutInDuration = duration;
        this.cutinName = name;
    }
    drawCutIn(ctx) {
        // console.log(this.cutInX);
        this.cutInDuration -= this.game.clockTick;
        if (this.cutInDuration > 0.5 && this.cutInX <= 450) {
            this.cutInX -= this.game.clockTick * 100;
        } else {
            this.cutInX -= this.game.clockTick * 2000;
        }
        if (this.cutInDuration > 0.5 && this.cutInY <= 300) {
            this.cutInY -= this.game.clockTick * 100;
        } else {
            this.cutInY -= this.game.clockTick * 2000;
        }
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,1280,800);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/KoishiCutIn.png"),0,0,514,478,
            this.cutInX, 800 - 478 * 1.5, 514 * 1.5, 478 * 1.5
            );
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = '60px cursive'
        ctx.fillText(this.cutinName, 600, this.cutInY, 600);
        

    }


    drawPause(ctx) {
        let selected = this.game.menuController.selected;
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"),
            0,0, 
            1280,800);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/paused.png"),
            (1280 - 400) / 2, 50, 
            400, 200);
        let icons = ['resume','restart','mainmenu'];
        for (let i = 0; i < icons.length; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/"+ icons[i] + ".png"),
                (1280 - 300) / 2, 300 + 150 * i, 
                300, 150);
            if (selected == i) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./assets/arrow.png"),
                    (1280 - 300) / 2 + 300, 300 + 150 * i, 
                    150, 150);
            }
        }
    }

    drawGameOver(ctx) {
        ctx.globalAlpha = this.alpha;
        if (this.alpha < 1) this.alpha += this.game.clockTick * 0.5;
        else this.alpha = 1; 
        let selected = this.game.menuController.selected;
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/gameover.png"),
            (1280 - 400) / 2, 50, 
            400, 200);
        let icons = ['restart','mainmenu'];
        for (let i = 0; i < icons.length; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/"+ icons[i] + ".png"),
                (1280 - 300) / 2, 300 + 150 * i, 
                300, 150);
            if (selected == i) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./assets/arrow.png"),
                    (1280 - 300) / 2 + 300, 300 + 150 * i, 
                    150, 150);
            }
        }
        ctx.globalAlpha = 1;
    }
        


    drawPlayerHealth(ctx) {
        // for (let i = 0; i < Math.floor(this.game.player.health / 2); i++) {
        //     ctx.drawImage(this.healthIcon,0,0,500,500,20 + i * 50, 20, 100,100);
        // }
        // if (this.game.player.health % 2 == 1) {
        //     ctx.drawImage(this.healthIcon,0,0,300,500,20 + 50 * (Math.floor(this.game.player.health / 2)), 20, 60,100);
        // }
        if (this.game.player.health > 5) {
            let surplus = this.game.player.health - 5;
            for (let i = 0; i < 5; i++) {
                ctx.drawImage(this.healthIcon,0,0,500,500, 20 + i * 50, 20, 100,100);
            }
            for (let i = 0; i < surplus; i++) {
                ctx.drawImage(this.healthIcon,0,0,500,500, 50 + i * 50, 50, 100,100);
            }
        } else {
            for (let i = 0; i < this.game.player.health; i++) {
                ctx.drawImage(this.healthIcon,0,0,500,500, 20 + i * 50, 20, 100,100);
            }
        }

    }

    drawVictory(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, 1280, 800);
        ctx.globalAlpha = this.alpha;
        if (this.alpha < 1) this.alpha += this.game.clockTick * 1;
        else this.alpha = 1; 

        let selected = this.game.menuController.selected;

        ctx.fillStyle = "White"
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"), 0, 0)
        ctx.font = "bold 100px Cursive";
        ctx.fillStyle = "Green"
        ctx.fillText("Victory!", 450, 200);

        ctx.font = "50px serif";
        ctx.fillStyle = "white"
        // ctx.fillText("Total: " + Math.round(sum * 100) / 100 + "s", 450, 300 + 50 * 5);

        let icons = ['restart','mainmenu'];
        for (let i = 0; i < icons.length; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/"+ icons[i] + ".png"),
                (1280 - 300) / 2, 500 + 150 * i, 
                300, 150);
            if (selected == i) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./assets/arrow.png"),
                    (1280 - 300) / 2 + 300, 500 + 150 * i, 
                    150, 150);
            }
        }
        ctx.globalAlpha = 1;
    }

    // drawTimer(ctx) {
    //     let time = this.game.timer.gameTime - this.game.startTime;
    //     if (this.game.roomManager.stage == 2 && this.game.bossRush) {
    //         time = time - this.game.cirnoTime;
    //     }
    //     if (this.game.roomManager.stage == 3 && this.game.bossRush) {
    //         time = time - this.game.meilingTime - this.game.cirnoTime;
    //     }
    //     if (this.game.roomManager.stage == 4 && this.game.bossRush) {
    //         time = time - this.game.tenshiTime - this.game.meilingTime - this.game.cirnoTime;
    //     }

    //     // ctx.fillStyle = "black";
    //     // ctx.globalAlpha = 0.6;
    //     // ctx.fillRect(580, 65, 140, 40);
    //     // ctx.globalAlpha = 1;
    //     time = Math.round((time) * 100) / 100;
    //     ctx.font = "40px arial";
    //     ctx.fillStyle = "white";
    //     ctx.strokeStyle = "black";
    //     if ((time * 100) % 100 == 0) {
    //         ctx.fillText(time + ".00s", 600, 100);
    //         ctx.strokeText(time + ".00s", 600, 100);
    //     } else if ((time * 100) % 10 == 0) {
    //         ctx.fillText(time + "0s", 600, 100);
    //         ctx.strokeText(time + "0s", 600, 100);
    //     } else {
    //         ctx.fillText(time + "s", 600, 100);
    //         ctx.strokeText(time + "s", 600, 100);
    //     }
    // }
    
    drawBossHealthBar(ctx) {
        const healthPercent = this.game.boss.health / this.game.boss.maxHealth;
        ctx.font = "30px cursive";
        // ctx.fillStyle = "Black";
        // ctx.globalAlpha = 0.6;
        // ctx.fillRect(240, 720, 100, 50);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "White";
        ctx.fillText("Komeiji Koishi", 250, 750, 140);
        ctx.fillStyle = "black";
        ctx.fillRect(238, 758, 804, 24)
        if (this.game.boss.phase % 2 == 0) ctx.fillStyle = "Green"; 
        else ctx.fillStyle = "Yellow";
        ctx.fillRect(240, 760, 800, 20);
        if (this.game.boss.phase % 2 == 0) ctx.fillStyle = "Yellow";
        else ctx.fillStyle = "Red";
        ctx.fillRect(1040 - 800*(1 - healthPercent), 760, 800*(1 - healthPercent), 20);
    }

    drawCredits(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"),
            0,0, 
            1280,800);
        ctx.font = "40px serif";
        ctx.fillStyle = "white";
        let text = [
            "All credit to Team Shanghai Alice for the Touhou Project.",
            "",
            "",
            ""
        ];
        for (let i = 0; i < text.length; i++) {
            ctx.fillText(text[i], 100, 100 + 80 * i);
        }
        ctx.font = "100px cursive";
        ctx.fillStyle = "green";
        ctx.fillText("Return", 540, 700);
    };
    
    drawMainMenu(ctx) {
        let selected = this.game.menuController.selected;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let screen = ASSET_MANAGER.getAsset("./assets/title.png");
        ctx.drawImage(screen, 0, 0);
        let icons = ['start','options','credits'];
        for (let i = 0; i < icons.length; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/"+ icons[i] + ".png"),
                (1280 - 300) / 2, 300 + 150 * i, 
                300, 150);
            if (selected == i) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./assets/arrow.png"),
                    (1280 - 300) / 2 + 300, 300 + 150 * i, 
                    150, 150);
            }
        }
    }

    drawOptions(ctx) {
        let selected = this.game.menuController.selected;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"),
            0,0, 
            1280,800);
        ctx.font = "bold 100px cursive"
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Keyboard", (1280 - 500) / 2, 400, 600);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Controller", (1280 - 500) / 2, 500, 600);
        if (selected == 2) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        let volume = ASSET_MANAGER.volume;
        volume = Math.round(ASSET_MANAGER.volume * 100);
        ctx.fillText("Set Volume: "+ volume + "%", (1280 - 500) / 2, 600, 600);
        if (selected == 3) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Return", (1280 - 500) / 2, 700, 600);
    }

    drawControls(ctx) {
        let selected = this.game.menuController.selected;
        ctx.font = "bold 100px cursive"
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"),
        0,0, 
        1280,800);
        let controls = [
            "Left",
            "Right",
            "Up",
            "Down",
            "Jump",
            "Attack",
            "Dash",
            "Pause"
        ];
        let options = ["Bind all", "Restore Defaults", "Return"]
        for (let i = 0; i < 3; i++) {
            if (selected == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(options[i], 20, 500 + 100 * i);
        }
        ctx.fillStyle = "white"
        ctx.font = "30px cursive"
        let i = 0;
        for (let i = 0; i < controls.length; i++) {
            if (this.game.menuController.binding == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(controls[i], 800, 100 + 40 * i);
        }
        for (const x of inputManager.keybinds.entries()) {
            if (this.game.menuController.binding == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText("--- " + x[0], 900, 100 + 40 * i);
            i++;
        }
    }

    drawControllerControls(ctx) {
        let selected = this.game.menuController.selected;
        ctx.font = "bold 100px cursive"
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"),
        0,0, 
        1280,800);
        let controls = [
            "Left",
            "Right",
            "Up",
            "Down",
            "Jump",
            "Attack",
            "Dash",
            "Pause"
        ];
        let options = ["Bind all", "Restore Defaults", "Return"]
        for (let i = 0; i < 3; i++) {
            if (selected == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(options[i], 20, 500 + 100 * i);
        }
        ctx.fillStyle = "white"
        ctx.font = "30px cursive"
        let i = 0;
        for (let i = 0; i < controls.length; i++) {
            if (this.game.menuController.binding == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(controls[i], 800, 100 + 40 * i);
        }
        for (const x of inputManager.controllerBinds.entries()) {
            if (this.game.menuController.binding == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText("--- " + x[0], 900, 100 + 40 * i);
            i++;
        }
        ctx.fillText("*Analog stick is always bound to movement", 650, 100 + 40 * 9);
    }

    drawFPS(ctx) {
        if (this.frameTimer <= 0) {
            this.fps = this.frameCount;
            this.frameTimer = 1;
            this.frameCount = 0;
        }
        this.frameTimer -= this.game.clockTick;
        this.frameCount++;
        ctx.font = "20px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(this.fps + "fps", 1220, 20, 100);
    }
    draw(ctx) {
        this.drawFPS(ctx);
        // if (this.game.roomManager.stage != 0) this.drawTimer(ctx);
        if (!this.game.dialog)this.drawBossHealthBar(ctx);
        this.drawPlayerHealth(ctx);
        if (this.cutInDuration > 0) this.drawCutIn(ctx);
        // this.drawBGM(ctx);
        // this.drawNextStage(ctx);
        // if (!this.game.paused) this.drawDialog(ctx);
        // if (this.game.player.interacting) {
        //     if (this.alpha < 1) this.alpha += 1.5 * this.game.clockTick;
        //     if (this.alpha >= 1) this.alpha = 1;
        // } else {
        //     if (this.alpha > 0) this.alpha -= 1.5 * this.game.clockTick;
        //     if (this.alpha <= 0) this.alpha = 0;
        // }
    }
}