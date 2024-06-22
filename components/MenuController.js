class MenuController {
    constructor(game) {
        Object.assign(this, {game});
        this.selected = 0;
        this.options = false;
        this.controls = false;
        this.binding = -1;
    }
    goToMainMenu() {
        this.game.mainMenu = true;
        this.restart();
    }
    restart() {
        if (ASSET_MANAGER.currentSong) ASSET_MANAGER.pauseBGM();
        this.game.reset();
    }
    optionSelection(optionCount) {
        if (inputManager.up && !inputManager.upHold) {
            inputManager.upHold = true;
            this.selected -= 1;
            if (this.selected < 0) this.selected = optionCount - 1;
            ASSET_MANAGER.playSound("menu_change_option");
        }
        if (inputManager.down && !inputManager.downHold) {
            inputManager.downHold = true;
            this.selected += 1;
            if (this.selected > optionCount - 1) this.selected = 0;
            ASSET_MANAGER.playSound("menu_change_option");
        }
    }

    creditsPage() {
        this.game.uiManager.drawCredits(this.game.ctx);
        if (inputManager.A && !inputManager.AHold) {
            ASSET_MANAGER.playSound("menu_confirm");
            inputManager.AHold = true;
            this.credits = false;
        }
    }

    mainMenu() {
        if (this.options) {
            if (this.controls) {
                this.controlsMenu()
            } else if (this.controllerControls) {
                this.controllerControlsMenu();
            } else {
                this.optionsMenu();
            }
        } else if (this.credits) {
            this.creditsPage();
        } else {
            this.game.uiManager.drawMainMenu(this.game.ctx);
            this.optionSelection(3);
            if (inputManager.A && !inputManager.AHold && this.selected == 0) { //END MENU START GAME
                inputManager.AHold = true;
                ASSET_MANAGER.playSound("menu_confirm");
                this.game.mainMenu = false;
                this.game.dialog = true;
            }
            if (inputManager.A && !inputManager.AHold && this.selected == 1) {
                inputManager.AHold = true;
                ASSET_MANAGER.playSound("menu_confirm");
                this.options = true;
                this.selected = 0;
            }
            if (inputManager.A && !inputManager.AHold && this.selected == 2) {
                inputManager.AHold = true;
                ASSET_MANAGER.playSound("menu_confirm");
                this.credits = true;
                this.selected = 0;
            }
        }
    }
    pauseMenu() {
        this.game.uiManager.drawPause(this.game.ctx);
        this.optionSelection(3);
        if ((inputManager.A && !inputManager.AHold && this.selected == 0) || (inputManager.pauseButton && !inputManager.pauseButtonHold)) { //END PAUSE MENU
            if (inputManager.pauseButton) inputManager.pauseButtonHold = true;
            if (inputManager.A) inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.game.paused = false;
            ASSET_MANAGER.resumeBGM();
            this.selected = 0;
        }
        if (inputManager.A && !inputManager.AHold && this.selected == 1) { //RESTART
            inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.restart();
        }
        if (inputManager.A && !inputManager.AHold && this.selected == 2) { //MAIN MENU
            inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.goToMainMenu();
        }
    }
    controllerBinding() {
        let controls = [
            "Left",
            "Right",
            "Up",
            "Down",
            "A",
            "B",
            "C",
            "Pause"
        ];

        if (inputManager.keyPress && !inputManager.keyHold) {
            inputManager.keyHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            if (!inputManager.controllerBinds.has(inputManager.key)) {
                inputManager.controllerBinds.set(inputManager.key, controls[this.binding]);
                this.binding += 1;
            } else {

            }
        }
        if (this.binding >= controls.length) {
            inputManager.controllerBinding = false;
            inputManager.pauseButtonHold = true;
        }
    }
    controllerControlsMenu() {
        this.optionSelection(3);
        this.game.uiManager.drawControllerControls(this.game.ctx);
        if (inputManager.controllerBinding) this.controllerBinding();
        if (inputManager.A && !inputManager.AHold && this.selected == 0) { //CONTROLLER BINDS
            inputManager.AHold = true;
            inputManager.keyHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.binding = 0;
            inputManager.controllerBinding = true;
            inputManager.controllerBinds.clear();
        }
        if (inputManager.A && !inputManager.AHold && this.selected == 1) { //DEFAULT CONTROLLER
            this.binding = 0;
            inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            inputManager.controllerBinds.clear();
            inputManager.defaultController();
        }
        if ((inputManager.A && !inputManager.AHold && this.selected == 2) || (inputManager.pauseButton && !inputManager.pauseButtonHold)) { //RETURN
            if (inputManager.pauseButton) inputManager.pauseButtonHold = true;
            if (inputManager.A) inputManager.AHold = true;
            this.binding = 0;
            ASSET_MANAGER.playSound("menu_confirm");
            this.controllerControls = false;
            this.selected = 0;
        }
    }
    controlBinding() {
        let controls = [
            "Left",
            "Right",
            "Up",
            "Down",
            "A",
            "B",
            "C",
            "Pause"
        ];
        if (inputManager.keyPress && !inputManager.keyHold) {
            inputManager.keyHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            if (!inputManager.keybinds.has(inputManager.key)) {
                inputManager.keybinds.set(inputManager.key, controls[this.binding]);
                this.binding += 1;
            }
        }
        if (this.binding >= controls.length) {
            inputManager.keyBinding = false;
            inputManager.pauseButtonHold = true;
            inputManager.AHold = false;
        }
    }
    controlsMenu() {
        this.optionSelection(3);
        this.game.uiManager.drawControls(this.game.ctx);
        if (inputManager.keyBinding) this.controlBinding();
        if (inputManager.A && !inputManager.AHold && this.selected == 0) { //KEYBINDING
            inputManager.A = false;
            inputManager.AHold = true;
            inputManager.keyHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.binding = 0;
            inputManager.keyBinding = true;
            inputManager.keybinds.clear();
        }
        if (inputManager.A && !inputManager.AHold && this.selected == 1) { //DEFAULT
            inputManager.A = false;
            inputManager.AHold = true;
            this.binding = 0;
            ASSET_MANAGER.playSound("menu_confirm");
            inputManager.keybinds.clear();
            inputManager.defaultKeybinds();
        }
        if ((inputManager.A && !inputManager.AHold && this.selected == 2) || (inputManager.pauseButton && !inputManager.pauseButtonHold)) { //RETURN
            if (inputManager.pauseButton) inputManager.pauseButtonHold = true;
            if (inputManager.A) inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.controls = false;
            this.selected = 0;
            this.binding = 0;
        }
    }
    optionsMenu() {
        this.optionSelection(4);
        this.game.uiManager.drawOptions(this.game.ctx);
        if (this.selected == 0 && inputManager.A && !inputManager.AHold) { //KEYBIND MENU
            inputManager.AHold = true;
            this.controls = true;
            this.selected = 0;
            ASSET_MANAGER.playSound("menu_confirm");
        }
        if (this.selected == 1 && inputManager.A && !inputManager.AHold) { //KEYBIND MENU
            inputManager.AHold = true;
            this.controllerControls = true;
            this.selected = 0;
            ASSET_MANAGER.playSound("menu_confirm");
        }
        if (this.selected == 2) { //VOLUME
            if(inputManager.left && !inputManager.leftHold) {
                // console.log(ASSET_MANAGER.volume);
                inputManager.leftHold = true;
                if (ASSET_MANAGER.volume >= 0.1) ASSET_MANAGER.adjustVolume(ASSET_MANAGER.volume - 0.1);
                ASSET_MANAGER.playSound("menu_change_option");
            }
            if (inputManager.right && !inputManager.rightHold) {
                // console.log(ASSET_MANAGER.volume);
                inputManager.rightHold = true;
                if (ASSET_MANAGER.volume <= 0.9) ASSET_MANAGER.adjustVolume(ASSET_MANAGER.volume + 0.1);
                ASSET_MANAGER.playSound("menu_change_option");
            }
        }
        if ((inputManager.A && !inputManager.AHold && this.selected == 3) || (inputManager.pauseButton && !inputManager.pauseButtonHold)) { //RETURN
            if (inputManager.A) inputManager.AHold = true;
            if (inputManager.pauseButton) inputManager.pauseButtonHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.options = false;
            this.selected = 1;
        }
    }
    gameOver() {
        this.optionSelection(2);
        this.game.uiManager.drawGameOver(this.game.ctx);
        if (inputManager.A && !inputManager.AHold && this.selected == 0) { //RESTART
            inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.restart();
        }
        if (inputManager.A && !inputManager.AHold && this.selected == 1) { //MAIN MENU
            inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.goToMainMenu();
        }
    }
    victory() {
        this.optionSelection(2);
        this.game.uiManager.drawVictory(this.game.ctx);
        if (inputManager.A && !inputManager.AHold && this.selected == 0) { //RESTART
            inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.restart();
        }
        if (inputManager.A && !inputManager.AHold && this.selected == 1) { //MAIN MENU
            inputManager.AHold = true;
            ASSET_MANAGER.playSound("menu_confirm");
            this.goToMainMenu();
        }
    }

}