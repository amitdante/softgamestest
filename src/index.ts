import * as PIXI from "pixi.js";
import { SpriteExample } from "./app";
import { TextImageMixer } from "./TextImageMixer";
import { FireEffect } from "./FireEffect";
import particles = require('pixi-particles');

const app = new PIXI.Application();
app.renderer.resize(window.innerWidth, window.innerHeight);
let bunnyTexture: PIXI.BaseTexture;
let textsArray: PIXI.Text[] = [];

document.body.appendChild(app.view);

window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

LoadBaseGame();

function LoadBaseGame() {


    bunnyTexture = new PIXI.BaseTexture("./assets/bunny.jpg");


    let spriteExampleText = new PIXI.Text('Sprite Example ', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1110, align: 'center' });
    textsArray.push(spriteExampleText);
    spriteExampleText.position.set((app.renderer.width / 2) - spriteExampleText.width / 2, app.renderer.height / 4);
    spriteExampleText.interactive = true;
    spriteExampleText.buttonMode = true;
    spriteExampleText.on('pointerdown', () => {
        DisableButtons();
        const spriteGame = new SpriteExample(app, bunnyTexture);
        spriteGame.load();
    }, this);

    app.stage.addChild(spriteExampleText);

    let textImageText = new PIXI.Text('Text Image Integration', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1110, align: 'center' });
    textsArray.push(textImageText);
    textImageText.position.set((app.renderer.width / 2) - textImageText.width / 2, app.renderer.height / 2);
    textImageText.interactive = true;
    textImageText.buttonMode = true;
    textImageText.on('pointerdown', () => {
        DisableButtons();
        const textImageMixer = new TextImageMixer(app, bunnyTexture, ["hello", 1, "World"]);

    }, this);

    app.stage.addChild(textImageText);

    let particleText = new PIXI.Text('Flame Particle', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1110, align: 'center' });
    textsArray.push(particleText);
    particleText.position.set((app.renderer.width / 2) - particleText.width / 2, app.renderer.height / 1.5);
    particleText.interactive = true;
    particleText.buttonMode = true;
    particleText.on('pointerdown', () => {
        DisableButtons();
        SpawnFireParticles();

    }, this);

    app.stage.addChild(particleText);



    let text = new PIXI.Text('FPS : ', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
    text.position.set(50, 50);
    app.stage.addChild(text);
    app.ticker.add(() => {

        text.text = "Fps : " + app.ticker.FPS.toFixed(2);
    });


    function DisableButtons() {
        textsArray.forEach((ele: PIXI.Text) => {
            ele.renderable = false;
        })
    }

    function EnableButtons() {
        textsArray.forEach((ele: PIXI.Text) => {
            ele.renderable = true;
        })
    }
}
var emitter = new particles.Emitter(

    // The PIXI.Container to put the emitter in
    // if using blend modes, it's important to put this
    // on top of a bitmap, and not use the root stage Container
    new PIXI.Container,

    // The collection of particle images to use
    [new PIXI.Texture(bunnyTexture)],

    // Emitter configuration, edit this to change the look
    // of the emitter
    {
        alpha: {
            list: [
                {
                    value: 0.8,
                    time: 0
                },
                {
                    value: 0.1,
                    time: 1
                }
            ],
            isStepped: false
        },
        scale: {
            list: [
                {
                    value: 1,
                    time: 0
                },
                {
                    value: 0.3,
                    time: 1
                }
            ],
            isStepped: false
        },
        color: {
            list: [
                {
                    value: "fb1010",
                    time: 0
                },
                {
                    value: "f5b830",
                    time: 1
                }
            ],
            isStepped: false
        },
        speed: {
            list: [
                {
                    value: 200,
                    time: 0
                },
                {
                    value: 100,
                    time: 1
                }
            ],
            isStepped: false
        },
        startRotation: {
            min: 0,
            max: 360
        },
        rotationSpeed: {
            min: 0,
            max: 0
        },
        lifetime: {
            min: 0.5,
            max: 0.5
        },
        frequency: 0.008,
        spawnChance: 1,
        particlesPerWave: 1,
        emitterLifetime: 0.31,
        maxParticles: 1000,
        pos: {
            x: 0,
            y: 0
        },
        addAtBack: false,
        spawnType: "circle",
        spawnCircle: {
            x: 0,
            y: 0,
            r: 10
        }
    }
);

function SpawnFireParticles() {
    emitter.emit = true;
    console.log(emitter);
    update();
}

// Calculate the current time
var elapsed = Date.now();

// Update function every frame
var update = function () {

    // Update the next frame
    requestAnimationFrame(update);

    var now = Date.now();

    // The emitter requires the elapsed
    // number of seconds since the last update
    emitter.update((now - elapsed) * 0.001);
    elapsed = now;

    // Should re-render the PIXI Stage
    // renderer.render(stage);
};



