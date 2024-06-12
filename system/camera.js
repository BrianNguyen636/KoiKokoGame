class Camera {
    constructor() {
        this.width = 1280;
        this.height = 800;
        this.player = gameEngine.player;
        this.pCenter = this.player.getCenter();
        this.x = this.pCenter.x - (this.width / 2);
        this.y = 100;
        this.player.displayX = (this.width - this.player.sWidth)/2;

        // this.player.displayY = this.player.y;
    }

    getCenter() {
        return {
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2)
        }
    }

    update() {
        // console.log(this.x + ", " + this.y);
        let lastPos= {x:this.x, y:this.y}

        this.pCenter = this.player.getCenter();
        this.player.displayY = this.player.y;
        // if (this.playerDisplayY < 200) {
        //     this.y += this.player.delta.y;
        //     if (this.playerDisplayY > (this.height - this.player.sHeight) / 2) {
        //         this.y = 0;
        //         this.playerDisplayY = this.player.y;
        //     }
        // } else {
        //     this.y = 0;
        //     this.playerDisplayY = this.player.y;
        // }


        if (this.x > 0 && this.x+this.width < 2500) {
            this.x += this.player.delta.x;
        } else {
            this.player.displayX += this.player.delta.x;
            if ((this.player.displayX > (this.width - this.player.sWidth) / 2 && this.x <= 0) ||
                (this.player.displayX < (this.width - this.player.sWidth) / 2 && this.x+this.width >= 2500)) {
                this.x += this.player.delta.x;
            }
        }

        this.delta = {
            x: this.x - lastPos.x,
            y: this.y - lastPos.y
        }
        gameEngine.entities.forEach(e => {
            if (e.id != 'player') {
                e.displayX -= this.delta.x;
                e.displayY -= this.delta.y;
            }
        });
    }
}