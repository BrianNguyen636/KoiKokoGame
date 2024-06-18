class InputManager {
    constructor() {
        this.ctx=null;
        this.click = null;
        this.mouse = null;
        this.wheel = null;

        this.controllerIndex = null;
        this.usingController = false;
        this.keyBinding = false;
        this.controllerBinding = false;
        this.keybinds = new Map();
        this.controllerBinds = new Map();

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.dash = false;
        this.A = false;
        this.B = false;
        this.C = false;
        this.pauseButton = false;

        this.leftHold = false;
        this.rightHold = false;
        this.upHold = false;
        this.downHold = false;
        this.dashHold = false;
        this.AHold = false;
        this.BHold = false;
        this.CHold = false;
        this.pauseButtonHold = false;
        this.keyHold = false;

        this.defaultKeybinds();
        this.defaultController();
        this.R = false;
        this.key;
        this.keyPress = false;

        this.history=[];
    }

    setCtx(ctx) {
        this.ctx = ctx;
    }


    update() {
        if (this.controllerIndex != null) this.controllerButtons();
        this.buttonHolds();
    }

    defaultKeybinds() {
        this.keybinds.set("ArrowLeft", "Left");
        this.keybinds.set("ArrowRight", "Right");
        this.keybinds.set("ArrowUp", "Up");
        this.keybinds.set("ArrowDown", "Down");
        this.keybinds.set("KeyZ", "A");
        this.keybinds.set("KeyX", "B");
        this.keybinds.set("KeyC", "C");
        this.keybinds.set("Escape", "Pause");
    };
    
    defaultController() {
        this.controllerBinds.set(14, "Left");
        this.controllerBinds.set(15, "Right");
        this.controllerBinds.set(12, "Up");
        this.controllerBinds.set(13, "Down");
        this.controllerBinds.set(0, "A");
        this.controllerBinds.set(1, "C");
        this.controllerBinds.set(2, "B");
        this.controllerBinds.set(9, "Pause");
        
    };
    startInput() {
        var that = this;
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            // if (this.options.debugging) {
            //     console.log("MOUSE_MOVE", getXandY(e));
            // }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            // if (this.options.debugging) {
            //     console.log("CLICK", getXandY(e));
            // }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            // if (this.options.debugging) {
            //     console.log("WHEEL", getXandY(e), e.wheelDelta);
            // }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            // if (this.options.debugging) {
            //     console.log("RIGHT_CLICK", getXandY(e));
            // }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", function(e) {
            that.usingController = false;
            if (!that.keyBinding && that.keybinds.has(e.code)) {
                switch(that.keybinds.get(e.code)) {
                    case "Left": that.left = true; break;
                    case "Right": that.right = true; break;
                    case "Up": that.up = true; break;
                    case "Down": that.down = true; break;
                    case "Dash": that.dash = true; break;
                    case "A": that.A = true; break;
                    case "B": that.B = true; break;
                    case "C": that.C = true; break;
                    case "Pause": that.pauseButton = true; break;
                }
                console.log(e.code);
            } else if (that.keyBinding) {
                that.key = e.code;
                that.keyPress = true;
            } 
        });
        this.ctx.canvas.addEventListener("keyup", function(e) {
            if (!that.keyBinding && that.keybinds.has(e.code)) {
                switch(that.keybinds.get(e.code)) {
                    case "Left": that.left = false; break;
                    case "Right": that.right = false; break;
                    case "Up": that.up = false; break;
                    case "Down": that.down = false; break;
                    case "Dash": that.dash = false; break;
                    case "A": that.A = false; break;
                    case "B": that.B = false; break;
                    case "C": that.C = false; break;
                    case "Pause": that.pauseButton = false; break;
                }
            } else if (that.keyBinding) {
                that.keyPress = false;
            } 
        });
        window.addEventListener("gamepadconnected", function(e) {
            console.log(
              "Gamepad connected at index %d: %s. %d buttons, %d axes.",
              e.gamepad.index,
              e.gamepad.id,
              e.gamepad.buttons.length,
              e.gamepad.axes.length,
            );
            that.controllerIndex = e.gamepad.index;
        });
        window.addEventListener("gamepaddisconnected", function(e) {
            that.controllerIndex = null;
        });
    };

    buttonHolds() {
        if (!this.left) this.leftHold = false;
        if (!this.right) this.rightHold = false;
        if (!this.up) this.upHold = false;
        if (!this.down) this.downHold = false;
        if (!this.dash) this.dashHold = false;
        if (!this.A) this.AHold = false;
        if (!this.B) this.BHold = false;
        if (!this.C) this.CHold = false;
        if (!this.pauseButton) this.pauseButtonHold = false;
        if (!this.keyPress) this.keyHold = false;
    };

    controllerButtons() {
        let controller = navigator.getGamepads()[this.controllerIndex];
        if (this.usingController) this.keyPress = false;
        for (let i = 0; i < controller.buttons.length; i++) {
            if (controller.buttons[i].pressed || 
                Math.abs(controller.axes[0]) > 0.25 || Math.abs(controller.axes[1]) > 0.25) {
                this.usingController = true;
            }
            if (this.controllerBinding && controller.buttons[i].pressed) {
                this.keyPress = true;
                console.log(this.keyPress);
                this.key = i;
            }
        }
        if (this.usingController && !this.controllerBinding) {
            for (let i = 0; i < controller.buttons.length; i++) {
                if (this.controllerBinds.has(i)) {
                    switch(this.controllerBinds.get(i)) {
                        case "Left": this.left = controller.buttons[i].pressed || controller.axes[0] < -0.25; break;
                        case "Right": this.right = controller.buttons[i].pressed || controller.axes[0] > 0.25; break;
                        case "Up": this.up = (controller.buttons[i].pressed || controller.axes[1] < -0.5); break;
                        case "Down": this.down = (controller.buttons[i].pressed || controller.axes[1] > 0.5); break;
                        case "A": this.A = controller.buttons[i].pressed; break;
                        case "B": this.B = controller.buttons[i].pressed; break;
                        case "C": this.C = controller.buttons[i].pressed; break;
                        case "Pause": this.pauseButton = controller.buttons[i].pressed; break;
                    }
                }
            }
        }
    };
}
