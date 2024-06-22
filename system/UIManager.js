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
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, 1280, 800);
        ctx.globalAlpha = this.alpha;
        if (this.alpha < 1) this.alpha += this.game.clockTick * 1;
        else this.alpha = 1; 

        let selected = this.game.menuController.selected;

        ctx.fillStyle = "White"
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/EndScreen.png"), 0, 0)

        ctx.textBaseline = 'middle'
        ctx.textAlign ='center'
        ctx.font = "30px cursive";
        ctx.fillStyle = "Green"
        ctx.strokeStyle = 'white';
        let time = this.game.timer.gameTime;
        let minutes = Math.floor(time / 60);
        let seconds = Math.round((time % 60) * 100) / 100
        if (seconds < 10) seconds = "0"+seconds;
        if (minutes < 10) minutes = "0"+minutes;
        ctx.fillText("Time: " + minutes + ":" + seconds, 1280/2, 30);
        // ctx.strokeText("Time: " + Math.round(this.game.timer.gameTime * 100) / 100 + "s", 1280/2, 400);

        let icons = ['restart','mainmenu'];
        for (let i = 0; i < icons.length; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/"+ icons[i] + ".png"),
                (1280 - 300) / 2, 500 + 120 * i, 
                300, 150);
            if (selected == i) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./assets/arrow.png"),
                    (1280 - 300) / 2 + 300, 500 + 120 * i, 
                    150, 150);
            }
        }
        ctx.restore();
    }

    drawTimer(ctx) {
        let time = this.game.timer.gameTime;
        let minutes = Math.floor(time / 60);
        let seconds = Math.round((time % 60) * 100) / 100
        if (seconds < 10) seconds = "0"+seconds;
        if (minutes < 10) minutes = "0"+minutes;
        ctx.font = "20px cursive";
        ctx.fillStyle = "white";
        let x = 0+20;
        let y = 800 - 20;
        ctx.fillText(minutes + ":" + seconds, x, y);
    }
    
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

        let stars = 2;
        if (this.game.boss.phase > 1) {
            stars--;
            if (this.game.boss.phase > 3) {
                stars--;
            }
        }
        for (let i = 0; i < stars; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/star.png"), 0,0,50,50,1040 - 25*(i+1) , 760-25, 25,25);
        }
    }

    drawCredits(ctx) {
        ctx.save();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"),
            0,0, 
            1280,800);
        ctx.font = "30px cursive";
        ctx.fillStyle = "white";
        ctx.textBaseline = 'middle'
        ctx.textAlign ='center'

        let text = [
            "All credit to Team Shanghai Alice for the Touhou Project.",
            "Created for Touhou Pride Jam 6",
            "",
            "AvianZebra: Programming, Menu art, Effects, UI, Writing",
            "Marrddaa: Sprite art, Background art, Portrait art",
            "Kasha: Music, Sound Effects",
            "",
            "Socials:",
            "@Avian_Zebra (Twitter)",
            "@marrddaa (Insta)",
            "kasha.dev"
        ];
        for (let i = 0; i < text.length; i++) {
            ctx.fillText(text[i], 1280/2, 100 + 40 * i);
        }
        ctx.font = "bold 60px cursive";
        ctx.fillStyle = "green";
        ctx.fillText("Return", (1280) / 2, 750, 400);
        ctx.restore();
    };
    
    drawMainMenu(ctx) {
        let selected = this.game.menuController.selected;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let screen = ASSET_MANAGER.getAsset("./assets/TitleScreen.png");
        ctx.drawImage(screen, 0, 0);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Title.png"), 0, 0);
        let icons = ['start','options','credits'];
        for (let i = 0; i < icons.length; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/"+ icons[i] + ".png"),
                (1280 - 300) / 2, 400 + 120 * i, 
                300, 150);
            if (selected == i) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./assets/arrow.png"),
                    (1280 - 300) / 2 + 300, 400 + 120 * i, 
                    150, 150);
            }
        }
    }

    drawOptions(ctx) {
        ctx.save();
        let selected = this.game.menuController.selected;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/AltScreen.png"),
            0,0, 
            1280,800);
        ctx.font = "bold 100px cursive"
        ctx.textBaseline = 'middle'
        ctx.textAlign ='center'
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Keyboard", (1280) / 2, 300, 600);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Controller", (1280) / 2, 400, 600);
        if (selected == 2) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        let volume = ASSET_MANAGER.volume;
        volume = Math.round(ASSET_MANAGER.volume * 100);
        ctx.fillText("Set Volume: "+ volume + "%", (1280) / 2, 500, 600);
        if (selected == 3) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Return", (1280) / 2, 700, 600);
        ctx.restore();
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
        ctx.font = "15px cursive";
        ctx.fillStyle = "white";
        ctx.fillText(this.fps + "fps", 1220, 20, 60);
    }
    draw(ctx) {
        this.drawFPS(ctx);
        if (!this.game.dialog) {
            this.drawBossHealthBar(ctx);
            this.drawTimer(ctx);
        }
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