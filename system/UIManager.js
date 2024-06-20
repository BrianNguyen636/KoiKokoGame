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
        ctx.globalAlpha = 0.3;
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/KoishiCutIn.png"),
            this.cutInX, 700 - 478, 
            514,478);
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
        for (let i = 0; i < this.game.player.health; i++) {
            ctx.drawImage(this.healthIcon,0,0,500,500,50 + i * 50, 20, 100,100);
        }
    }

    // drawVictory(ctx) {
    //     let selected = this.game.menuController.selected;
    //     ctx.fillStyle = "White"
    //     ctx.clearRect(0,0, 1280, 800);
    //     ctx.font = "bold 100px serif";
    //     ctx.fillStyle = "Green"
    //     ctx.fillText("Victory!", 450, 200);

    //     ctx.font = "50px serif";
    //     ctx.fillStyle = "white"
    //     let difficulty;
    //     if (this.game.lunatic) difficulty = "Lunatic";
    //     else difficulty = "Normal";
    //     ctx.fillText("Difficulty: " + difficulty, 450, 280);
    //     let sum = this.game.cirnoTime + this.game.meilingTime + this.game.tenshiTime + this.game.okuuTime;

    //     ctx.fillText("Cirno: " + this.game.cirnoTime + "s", 450, 300 + 50 * 1);

    //     ctx.fillText("Meiling: " + this.game.meilingTime + "s", 450, 300 + 50 * 2);

    //     ctx.fillText("Tenshi: " + this.game.tenshiTime + "s", 450, 300 + 50 * 3);

    //     ctx.fillText("Utsuho: " + this.game.okuuTime + "s", 450, 300 + 50 * 4);

    //     ctx.fillText("Total: " + Math.round(sum * 100) / 100 + "s", 450, 300 + 50 * 5);

    //     ctx.font = "60px serif";
    //     if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
    //     ctx.fillText("Restart", 470, 660);
    //     ctx.strokeText("Restart", 470, 660);
    //     if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
    //     ctx.fillText("Main Menu", 470, 720);
    //     ctx.strokeText("Main Menu", 470, 720);

    //     ctx.font = "30px arial";
    //     ctx.fillStyle = "white";
    //     ctx.fillText("v" + this.game.version, 10, 780);

    //     this.drawBGM(ctx);


    // }

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
        ctx.font = "30px Arial";
        // ctx.fillStyle = "Black";
        // ctx.globalAlpha = 0.6;
        // ctx.fillRect(240, 720, 100, 50);
        ctx.globalAlpha = 1;
        // ctx.fillStyle = "White";
        // ctx.fillText(this.bossName, 250, 750, 80);
        ctx.fillStyle = "black";
        ctx.fillRect(238, 758, 804, 24)
        if (this.game.boss.phase % 2 == 0) ctx.fillStyle = "Green"; 
        else ctx.fillStyle = "Yellow";
        ctx.fillRect(240, 760, 800, 20);
        if (this.game.boss.phase % 2 == 0) ctx.fillStyle = "Yellow";
        else ctx.fillStyle = "Red";
        ctx.fillRect(1040 - 800*(1 - healthPercent), 760, 800*(1 - healthPercent), 20);
    }

    // drawBGM(ctx) {
    //     ctx.fillStyle = "black";
    //     ctx.globalAlpha =  0.5;
    //     ctx.fillRect(780, 5, 500, 30);
    //     ctx.globalAlpha = 1;
    //     ctx.fillStyle = "white";
    //     ctx.strokeStyle = "black";
    //     ctx.font = "25px arial";
    //     ctx.fillText("BGM: " + this.bgmTitle, 800, 30, 470);
    //     ctx.strokeText("BGM: " + this.bgmTitle, 800, 30, 470);
    // }
    drawCredits(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"),
            0,0, 
            1280,800);
        ctx.font = "40px serif";
        ctx.fillStyle = "white";
        let text = [
            "All credit to Team Shanghai Alice for the Touhou Project.",
            "Credit to Twilight Frontier for the sprites and sfx.",
            "Credits to the various artists for the soundtrack.",
            "Thanks to Chris Marriot for \"How To Make A Web Game\"",
            "Programming by me.",
            "Main menu art by me."
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

    // drawDialog(ctx) {
    //     let selected = this.game.menuController.selected;
    //     let difficulty;
    //     if (this.game.lunatic) difficulty = "Lunatic";
    //     else difficulty = "Normal";
    //     ctx.globalAlpha = this.alpha;
    //     ctx.font = "40px serif";
    //     let options = [
    //         "On a journey. " + "["+ difficulty +"]",
    //         "To Misty Lake.",
    //         "To the Scarlet Devil Mansion.",
    //         "To Bhava-agra.",
    //         "To the Hell Geyser.",
    //         "I'll stay here for now."
    //     ];
    //     ctx.strokeStyle = "black";
    //     for (let i = 0; i < options.length; i++) {
    //         if (selected == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
    //         ctx.fillText(options[i], 540, 300 + 50 * i);
    //         ctx.strokeText(options[i], 540, 300 + 50 * i);
    //     }

    //     let portrait = ASSET_MANAGER.getAsset("./assets/YuyukoPortrait.png");
    //     ctx.drawImage(portrait, 0, 800 - 512);
        
    //     ctx.fillStyle = "black";
    //     ctx.globalAlpha = this.alpha * 0.75;
    //     ctx.fillRect(140, 600, 1000, 200);
    //     ctx.globalAlpha = this.alpha;

    //     ctx.font = "bold 40px Arial";
    //     ctx.fillStyle = "white";
    //     ctx.strokeStyle = "black";
    //     ctx.fillText("Yuyuko", 140 + 50, 640, 900);
    //     ctx.strokeText("Yuyuko", 140 + 50, 640, 900);
    //     ctx.font = "bold 80px serif";
    //     let dialog = "Hello Youmu, where would you like to go?";
    //     ctx.fillText(dialog, 140 + 50, 630 + 100, 900);
    //     ctx.strokeText(dialog, 140 + 50, 630 + 100, 900);

    //     ctx.globalAlpha = 1;
    // }

    drawFPS(ctx) {
        // ctx.fillStyle = "black";
        // ctx.globalAlpha =  0.5;
        // ctx.fillRect(1200, 0, 80, 30);
        // ctx.globalAlpha = 1;
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
        this.drawBossHealthBar(ctx);
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