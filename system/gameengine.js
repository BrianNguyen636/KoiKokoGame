// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        this.uiManager = new UIManager(this);
        this.floor = 700;
        this.mainMenu = null;
        this.dialog = false;
        this.ending = false;
        // Options and the Details
        this.options = options || {
            debugging: false,
        };
        // this.boxView = true;
    };

    startScreen(ctx, player) {
        ctx.canvas.addEventListener("click", e => {
            if (this.mainMenu == null) {
                // ASSET_MANAGER.playSound("Pause");
                this.mainMenu = true;
                this.init(ctx, player);
                this.start();
                ASSET_MANAGER.playSound("menu_confirm");
            }
        });
        ctx.canvas.addEventListener("keydown", e => {
            if (this.mainMenu == null) {
                // ASSET_MANAGER.playSound("Pause");
                this.mainMenu = true;
                this.init(ctx, player);
                this.start();
                ASSET_MANAGER.playSound("menu_confirm");
            }
        });
    }

    init(ctx, player) {
        this.ctx = ctx;
        this.defeat = false;
        this.victory = false;
        this.dialog = false;
        this.ending = false;
        inputManager.startInput();
        this.timer = new Timer();
        this.entities = [];
        this.addEntity(player);
        this.player = player;
        this.camera = new Camera();
        let kosher = new Koishi(this)
        this.addEntity(kosher);
        this.boss = kosher;
        this.uiManager = new UIManager(this);
        this.menuController = new MenuController(this);
        this.dialogManager = new DialogManager(this);
    };

    start() {
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    reset() {
        this.init(this.ctx, new Player(this));
        this.paused = false;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    addEntity(entity) {
        this.entities.push(entity);
    };
    clearProjectiles(){
        this.entities.forEach(e => {
            if (e.id == 'projectile') {
                e.removeFromWorld = true;
            }
        })
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        //DRAW THE BACKGROUND
        this.ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Stage.png"),
        -this.camera.x, -this.camera.y, 
        2500, 1000);
        

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];
            entity.draw(this.ctx, this);
        }

        this.uiManager.draw(this.ctx);
        this.dialogManager.draw(this.ctx);
    };



    update() {
        let entitiesCount = this.entities.length;
        
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        for (let i = entitiesCount - 1; i >= 0; --i) {
            let entity = this.entities[i];
            if (entity.removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
        this.dialogManager.update();
        this.camera.update();

        if (inputManager.pauseButton && !inputManager.pauseButtonHold) {
            inputManager.pauseButtonHold = true;
            this.pause();
        }
    };


    pause() {
        if (!this.paused) {
            this.paused = true;
            this.menuController.selected = 0;
            ASSET_MANAGER.playSound("pause");
            // ASSET_MANAGER.pauseBGM();
        }
    };

    loop() {
        inputManager.update();
        if (this.mainMenu) {
            this.menuController.mainMenu();
        } else if (this.paused) {
            this.menuController.pauseMenu();
        } else if (this.ending) {
            this.menuController.victory();
        } else { //NORMAL GAME
            this.clockTick = this.timer.tick();
            this.update();
            this.draw();
            if (this.defeat) {
                this.menuController.gameOver();
            }
        }
    };

};
