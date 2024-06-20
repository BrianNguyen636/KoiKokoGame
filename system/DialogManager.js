class DialogManager {
    constructor(game) {
        this.game = game;
        this.alpha = 0;
        this.index = 0;
        this.holdTime = 0;
        this.intro = [
            {speaker: 'H', text:"Koishi! There you are."},
            {speaker: 'H', text:"I won't lose this time. Now with what's at stake here."},
            {speaker: 'K', text:"Is that so? I don't feel like losing either."},
            {speaker: 'K', text:"Do you really want it that bad?"},
            {speaker: 'H', text:"You already know the answer. Now prepare yourself!"},
            {speaker: 'H', text:"I will be taking what's mine."},
            {speaker: 'K', text:"How scary~"},
            {speaker: 'K', text:"Alright, you can have it. If you beat me, that is!"}
        ];
        this.outro = [
            {speaker: 'K', text:"Ow ow ow..."},
            {speaker: 'H', text:"Looks like it's my victory this time."},
            {speaker: 'K', text:"Oh couldn't you have held back a little more?"},
            {speaker: 'H', text:"No can do. After all..."},
            {speaker: 'H', text:"I really wanted that last cake slice!"},
            {speaker: 'H', text:"It's my favorite from the store."},
            {speaker: 'K', text:"Aww, and I really wanted it too..."},
            {speaker: 'K', text:"Now I'm all beat up and I have no cake."},
            {speaker: 'H', text:"..."},
            {speaker: 'K', text:"Boohoo."},
            {speaker: 'H', text:"..."},
            {speaker: 'H', text:"Hey Koishi, why don't we split it after all."},
            {speaker: 'K', text:"Huh? You mean it?"},
            {speaker: 'H', text:"I just feel like it, okay?"},
            {speaker: 'K', text:"Ohhh Kokoro-chan!!! *hugs"},
            {speaker: 'H', text:"Woah!"},
            {speaker: 'K', text:"Kokoro-chan I love youuuu chuchuchu"},
            {speaker: 'H', text:"(This is sweeter than any slice of cake...)"}
        ];
    }
    advance() {
        ASSET_MANAGER.playSound("menu_change_option")
        if (!this.game.victory) {
            if (this.index < this.intro.length - 1) {
                this.index++;
            } else {
                this.game.dialog = false;
            }
        } else {
            if (this.index < this.outro.length - 1) {
                this.index++;
            } else {
                this.game.ending = true;
                this.game.dialog = false;
            }
        }
    }
    update(){
        if (this.game.dialog) {
            if (this.alpha < 1) {
                this.alpha += this.game.clockTick;
            } else {
                this.alpha = 1;
                if (inputManager.A && !inputManager.AHold) {
                    inputManager.AHold = true;
                    this.advance();
                }
                if (inputManager.AHold) {
                    this.holdTime += this.game.clockTick;
                } else this.holdTime = 0;

                if (this.holdTime > 1) {
                    this.game.dialog = false;
                    if (this.game.victory) this.game.ending = true;
                }
            }
        } else {
            if (this.alpha > 0) {
                this.alpha -= 2*this.game.clockTick;
                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.index = 0;
                    this.holdTime = 0;
                }
            }
        }
    }
    draw(ctx){
        ctx.globalAlpha = this.alpha;
        ctx.font = "30px cursive";
        ctx.fillStyle = 'white';
        
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/dialogue.png"),
            0, 800 - 285);


        let dialog;
        if (!this.game.victory) {
            dialog = this.intro;
        } else dialog = this.outro;
        let speaker = dialog[this.index].speaker;
        if (speaker == 'H') {
            speaker = "Kokoro";
        } else speaker = "Koishi"
        let text = dialog[this.index].text;
        ctx.fillText(speaker, 175, 800 - 285 + 45, 180);
        ctx.font = "60px cursive";
        ctx.fillText(text, 205, 800 - 285 + 190, 860);


        ctx.font = "20px cursive";
        if (this.holdTime > 0.5) {
            let i = this.holdTime - 0.5;
            ctx.fillStyle = 'gray';
            ctx.fillRect(900, 800 - 40, 0.5 * 400, 20);
            ctx.fillStyle = 'white';
            ctx.fillRect(900, 800 - 40, i * 400, 20);
        } else {
            ctx.fillText("Confirm to continue, Hold to skip", 900, 800-20);
        }
        ctx.globalAlpha = 1;
    }
}