class DialogManager {
    constructor(game) {
        this.game = game;
        this.alpha = 0;
        this.index = 0;
        this.holdTime = 0;
        this.kokoroSheet = ASSET_MANAGER.getAsset("./assets/KokoroPortraits.png")
        this.koishiSheet = ASSET_MANAGER.getAsset("./assets/KoishiPortraits.png")
        this.portraitSize = 1220;
        this.kkrEmote = 0;
        this.koiEmote = 0;

        this.endTransition = false;
        this.blackScreenAlpha = 0;

        this.intro = [
            {speaker: 'H', text:"Koishi! There you are.", emote: 1},
            {speaker: 'H', text:"I won't lose this time. Now with what's at stake here.", emote: 1},
            {speaker: 'K', text:"Is that so? I don't feel like losing either.", emote:1},
            {speaker: 'K', text:"Do you really want it that bad?", emote:0},
            {speaker: 'H', text:"You already know the answer. Now prepare yourself!", emote:0},
            {speaker: 'H', text:"I will be taking what's mine.", emote: 1},
            {speaker: 'K', text:"How scary~", emote:1},
            {speaker: 'K', text:"Alright, you can have it. If you beat me, that is!", emote:1}
        ];
        this.outro = [
            {speaker: 'K', text:"Ow ow ow...", emote:2},
            {speaker: 'H', text:"Looks like it's my victory this time.", emote:0},
            {speaker: 'K', text:"Oh couldn't you have held back a little more?", emote:2},
            {speaker: 'H', text:"No can do. After all...", emote:0},
            {speaker: 'H', text:"I really wanted that last cake slice!", emote:0},
            {speaker: 'H', text:"It's my favorite from the store.", emote:3},
            {speaker: 'K', text:"Aww, and I really wanted it too...", emote:3},
            {speaker: 'K', text:"Now I'm all beat up and I have no cake.", emote:3},
            {speaker: 'H', text:"...", emote: 0},
            {speaker: 'K', text:"Boohoo.", emote:3},
            {speaker: 'H', text:"...", emote: 0},
            {speaker: 'H', text:"Hey Koishi, why don't we split it after all.",emote: 0},
            {speaker: 'K', text:"Huh? You mean it?", emote:0},
            {speaker: 'H', text:"I just feel like it, okay?", emote:0},
            {speaker: 'K', text:"Ohhh Kokoro-chan!!! *hugs", emote:1},
            {speaker: 'H', text:"Woah!", emote:2},
            {speaker: 'K', text:"Kokoro-chan I love youuuu chuchuchu", emote:1},
            {speaker: 'H', text:"(This is sweeter than any slice of cake...)", emote:2}
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
                this.endTransition = true;
                // this.game.ending = true;
                // this.game.dialog = false;
            }
        }
    }
    update(){
        if (this.game.dialog) {
            if (this.alpha < 1) {
                this.alpha += this.game.clockTick;
                if (this.alpha > 1) this.alpha = 1;
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
                    if (this.game.victory) this.endTransition= true;
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
        let dialog;
        if (!this.game.victory) {
            dialog = this.intro;
        } else dialog = this.outro;
        let speaker = dialog[this.index].speaker;

        let kkrAlpha;
        let koiAlpha;
        if (speaker == 'H') {
            speaker = "Kokoro";
            this.kkrEmote = dialog[this.index].emote;
            kkrAlpha = 1;
            koiAlpha = 0.5;
        } else {
            speaker = "Koishi"
            this.koiEmote = dialog[this.index].emote;
            kkrAlpha = 0.5;
            koiAlpha = 1;
        }
        let text = dialog[this.index].text;
        ctx.globalAlpha = kkrAlpha * this.alpha;
        ctx.drawImage(this.kokoroSheet, 
            0, this.kkrEmote * this.portraitSize, this.portraitSize, this.portraitSize,
            0, 800-(this.portraitSize / 2) - 150, this.portraitSize / 2, this.portraitSize / 2
        );
        ctx.globalAlpha = koiAlpha * this.alpha;
        ctx.drawImage(this.koishiSheet, 
            0, this.koiEmote * this.portraitSize, this.portraitSize, this.portraitSize,
            1280 - this.portraitSize / 2, 800-this.portraitSize / 2 - 150, this.portraitSize / 2, this.portraitSize / 2
        );
        ctx.globalAlpha = this.alpha;
 
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/dialogue.png"),
            0, 800 - 285);

        ctx.font = "30px cursive";
        ctx.fillStyle = 'white';       
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
        
        if (this.endTransition) {
            
            this.blackScreenAlpha += 1 * this.game.clockTick;
            ctx.globalAlpha = this.blackScreenAlpha;
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,1280,800);
            ctx.globalAlpha = 1;
            if (this.blackScreenAlpha > 1) {
                this.game.ending = true;
                this.game.dialog = false;
            }
        }
    }
}