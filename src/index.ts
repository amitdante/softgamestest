import * as PIXI from "pixi.js";
import { SpriteExample } from "./app";
import { TextImageMixer } from "./TextImageMixer";
import { FireEffect } from "./FireEffect";


const app = new PIXI.Application();
app.renderer.resize(window.innerWidth, window.innerHeight);
let bunnyTexture: PIXI.BaseTexture;
let textsArray: PIXI.Text[] = [];
let backText: PIXI.Text;
enum State {
    menu,
    spriteExample,
    textImageMix,
    flame
}
let state: State;
let textImageMixer: TextImageMixer;
let fireEffect: FireEffect;

document.body.appendChild(app.view);
window.screen.orientation.lock('portrait-primary');

window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

LoadBaseGame();

function LoadBaseGame() {
    app.stage.removeChildren();

    state = State.menu;

    bunnyTexture = new PIXI.BaseTexture("./assets/bunny.jpg");


    let spriteExampleText = new PIXI.Text('Sprite Example ', { fontFamily: 'Arial', fontSize: 24, fill: 0x00ff00, align: 'center' });
    textsArray.push(spriteExampleText);
    spriteExampleText.position.set((app.renderer.width / 2) - spriteExampleText.width / 2, app.renderer.height / 3.5);
    spriteExampleText.interactive = true;
    spriteExampleText.buttonMode = true;
    spriteExampleText.on('pointerdown', () => {
        DisableButtons();
        const spriteGame = new SpriteExample(app, bunnyTexture);
        spriteGame.load();
        state = State.spriteExample;
    }, this);

    app.stage.addChild(spriteExampleText);

    let textImageText = new PIXI.Text('Text Image Integration', { fontFamily: 'Arial', fontSize: 24, fill: 0x00ff00, align: 'center' });
    textsArray.push(textImageText);
    textImageText.position.set((app.renderer.width / 2) - textImageText.width / 2, app.renderer.height / 2);
    textImageText.interactive = true;
    textImageText.buttonMode = true;
    textImageText.on('pointerdown', () => {
        DisableButtons();
        textImageMixer = new TextImageMixer(app, bunnyTexture, ["hello", 1, "World"]);
        state = State.textImageMix;
    }, this);

    app.stage.addChild(textImageText);

    let particleText = new PIXI.Text('Flame Particle', { fontFamily: 'Arial', fontSize: 24, fill: 0x00ff00, align: 'center' });
    textsArray.push(particleText);
    particleText.position.set((app.renderer.width / 2) - particleText.width / 2, app.renderer.height / 1.5);
    particleText.interactive = true;
    particleText.buttonMode = true;
    particleText.on('pointerdown', () => {
        DisableButtons();
        fireEffect = new FireEffect(app);
        state = State.flame;
    }, this);

    app.stage.addChild(particleText);

    backText = new PIXI.Text('Back', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1110, align: 'center' });
    backText.position.set((app.renderer.width / 2) - backText.width / 2, app.renderer.height / 1.15);
    backText.interactive = false;
    backText.buttonMode = false;
    backText.renderable = false;
    backText.on('pointerdown', () => {
        if (state == State.textImageMix) {
            textImageMixer.ClearStage();
            textImageMixer = null;
        } else if (state == State.flame) {
            fireEffect.ClearStage();
            fireEffect = null;
        }
        LoadBaseGame()

    }, this);

    app.stage.addChild(backText);



    let text = new PIXI.Text('FPS : ', { fontFamily: 'Arial', fontSize: 15, fill: 0xffffff, align: 'center' });
    text.position.set(20, 20);
    app.stage.addChild(text);
    app.ticker.add(() => {

        text.text = "Fps : " + app.ticker.FPS.toFixed(2);
    });


    function DisableButtons() {
        textsArray.forEach((ele: PIXI.Text) => {
            ele.renderable = false;
            ele.interactive = false;
            ele.buttonMode = false;
        })
        backText.interactive = true;
        backText.buttonMode = true;
        backText.renderable = true;
    }

}






