import * as PIXI from "pixi.js";

export class SpriteExample {
    app: PIXI.Application;

    constructor(app: PIXI.Application, texture: PIXI.BaseTexture) {
        this.app = app;
        this.bunnyTexture = texture;
    }
    imagesToSpawn: number = 144;
    finalPos: Vector;
    imagesArray: PIXI.Sprite[] = new Array();
    currImageIndex: number;
    movementInterval: NodeJS.Timeout;
    speed: number = 5;
    alpha: number = 0.005;
    bunnyTexture: PIXI.BaseTexture;

    load() {

        this.finalPos = { x: this.app.renderer.width / 2, y: this.app.renderer.height / 1.5 };



        for (let i = 0; i < this.imagesToSpawn; i++) {
            const texture = new PIXI.Texture(this.bunnyTexture);
            const bunny = new PIXI.Sprite(texture);

            this.imagesArray.push(bunny);

            bunny.x = this.app.renderer.width / 6;
            bunny.y = (this.app.renderer.height / 1.5) - (i * 2);
            bunny.scale.set(0.3, 0.3);

            this.app.stage.addChild(bunny);
        }

        this.currImageIndex = this.imagesArray.length;

        this.movementInterval = setInterval(this.StartMovement.bind(this), 1000);



    }

    MoveSprite(obj: PIXI.Sprite) {

        var dx = obj.x - this.finalPos.x;
        var dy = obj.y - this.finalPos.y;
        const dist: number = Math.sqrt(dx * dx + dy * dy);

        this.alpha += 0.001;
        if (this.alpha > 0.9) {

            return;
        } else {
            if (dist > 0.1) {
                obj.x = this.lerp(obj.x, this.finalPos.x, this.alpha);
                obj.y = this.lerp(obj.y, this.finalPos.y, this.alpha);

            }
        }
    }


    StartMovement() {

        this.alpha = 0.005;
        this.currImageIndex--;
        let localPos = { x: this.finalPos.x, y: this.finalPos.y };
        this.finalPos.y = (this.app.renderer.height / 1.5) - ((this.imagesArray.length - this.currImageIndex) * 2);
        this.imagesArray[this.currImageIndex].zIndex = (this.imagesArray.length - this.currImageIndex);
        this.app.stage.sortChildren();
        let localIndex = this.currImageIndex;
        let localAlpha = this.alpha;


        let interval = setInterval(this.MoveSprite.bind(this), 10, this.imagesArray[localIndex]);
        setTimeout(() => {
            this.imagesArray[localIndex].position.set(localPos.x, localPos.y);
            clearInterval(interval);
        }, 2000);

    }


    lerp(start: number, end: number, amt: number): number {
        return (1 - amt) * start + amt * end
    }
}
interface Vector {
    x: number,
    y: number
}
