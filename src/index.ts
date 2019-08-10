import * as PIXI from "pixi.js";
import { SpriteExample } from "./app";

const app = new PIXI.Application();
app.renderer.resize(window.innerWidth, window.innerHeight);


document.body.appendChild(app.view);

window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

LoadBaseGame();

function LoadBaseGame() {
    let spriteExampleText = new PIXI.Text('Sprite Example ', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1110, align: 'center' });
    spriteExampleText.position.set((app.renderer.width / 2) - spriteExampleText.width / 2, app.renderer.height / 4);
    spriteExampleText.interactive = true;
    spriteExampleText.buttonMode = true;
    spriteExampleText.on('pointerdown', () => {
        spriteExampleText.renderable = false;
        const spriteGame = new SpriteExample(app);
        spriteGame.load();
    }, this);

    app.stage.addChild(spriteExampleText);

    let textImageText = new PIXI.Text('Text Image Integration', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1110, align: 'center' });
    textImageText.position.set((app.renderer.width / 2) - textImageText.width / 2, app.renderer.height / 2);
    textImageText.interactive = true;
    textImageText.buttonMode = true;
    textImageText.on('pointerdown', () => {
        textImageText.renderable = false;
        const spriteGame = new SpriteExample(app);
        spriteGame.load();
    }, this);

    app.stage.addChild(textImageText);
}

