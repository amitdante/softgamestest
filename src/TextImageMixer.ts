import * as PIXI from "pixi.js";

export class TextImageMixer {
    constructor(app: PIXI.Application, texture: PIXI.BaseTexture, content: any) {
        this.app = app;
        this.content = content;
        this.bunnyTexture = texture;
        this.PopulateDisplayArray();

    }

    app: PIXI.Application;
    content: any;
    fontSize: number = 20;
    sceneObjects: any = [];
    bunnyTexture: PIXI.BaseTexture;
    displayChangerInterval: NodeJS.Timer;
    dummyTexts: string[] = ["hello", "world", "soft", "games", "dev", "test"];

    PopulateDisplayArray() {
        let posX = (this.app.renderer.width / 2) - (this.content.length * this.fontSize);
        this.content.forEach((element: string | number) => {
            if (typeof element === 'string') {
                let text = new PIXI.Text(`${element}`, { fontFamily: 'Arial', fontSize: this.fontSize, fill: 0x11dbb3, align: 'center' });
                this.sceneObjects.push(text);
                text.position.set(posX, this.app.renderer.height / 2);
                this.app.stage.addChild(text);
                posX += text.width + (this.fontSize / 2);
            } else {
                let spawnSpriteFunc = this.SpawnSprite.bind(this);
                let bunny = spawnSpriteFunc();
                this.sceneObjects.push(bunny);
                bunny.x = posX;
                bunny.y = this.app.renderer.height / 2;
                bunny.height = this.fontSize;
                bunny.width = this.fontSize;

                this.app.stage.addChild(bunny);
                posX += bunny.width + (this.fontSize / 2);

            }

        });
        this.displayChangerInterval = setTimeout(this.ChangeDisplay.bind(this), 2000);

    }

    ChangeDisplay() {
        clearTimeout(this.displayChangerInterval);
        this.sceneObjects.forEach((element: PIXI.Sprite) => {
            if (element.texture != null)
                element.destroy();
        });
        this.fontSize = this.getRandomInt(15, 50);
        let size: number = this.getRandomInt(0, 10);
        this.content.length = 0;
        for (let i = 0; i < size; i++) {
            let rand: number = Math.round(Math.random())
            if (rand == 0) {
                this.content.push(this.dummyTexts[this.getRandomInt(0, 5)]);
            } else {
                this.content.push(1);
            }
        }
        let dispFunc = this.PopulateDisplayArray.bind(this);

        dispFunc();
    }
    SpawnSprite(): PIXI.Sprite {
        let texture = new PIXI.Texture(this.bunnyTexture);
        let bunny = new PIXI.Sprite(texture);

        return bunny;
    }

    ClearStage() {
        this.sceneObjects.forEach((element: PIXI.Sprite) => {
            if (element.texture != null)
                element.destroy();
        });
        clearInterval(this.displayChangerInterval);
    }

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}