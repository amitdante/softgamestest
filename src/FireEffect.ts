import particles = require('pixi-particles');
import * as PIXI from "pixi.js";

export class FireEffect {
    constructor(app: PIXI.Application) {
        this.app = app;
        this.LoadEverything();
    }
    app: PIXI.Application;
    myContainer: PIXI.ParticleContainer = new PIXI.ParticleContainer();
    elapsed: number = Date.now();
    flameInterval: NodeJS.Timer;
    myEmitter: particles.Emitter = new particles.Emitter(
        this.myContainer,


        [PIXI.Texture.from("./assets/fire3.png")],

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
                        value: 0.7,
                        time: 0
                    },
                    {
                        value: 0.2,
                        time: 1
                    }
                ],
                isStepped: false
            },
            color: {
                list: [
                    {
                        value: "fff191",
                        time: 0
                    },
                    {
                        value: "ff622c",
                        time: 1
                    }
                ],
                isStepped: false
            },
            speed: {
                list: [
                    {
                        value: 500,
                        time: 0
                    },
                    {
                        value: 500,
                        time: 1
                    }
                ],
                isStepped: false
            },
            startRotation: {
                min: 265,
                max: 275
            },
            rotationSpeed: {
                min: 50,
                max: 50
            },
            lifetime: {
                min: 0.1,
                max: 0.7
            },
            blendMode: "normal",
            frequency: 0.001,
            spawnChance: 1,
            particlesPerWave: 1,
            emitterLifetime: 0,
            maxParticles: 30,
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
        });

    LoadEverything() {
        this.myContainer.x = this.app.renderer.width / 2;
        this.myContainer.y = this.app.renderer.height / 2;
        this.app.stage.addChild(this.myContainer);
        this.myEmitter.emit = true;
        this.flameInterval = setInterval(() => {
            var now = Date.now();

            this.myEmitter.update((now - this.elapsed) * 0.001);
            this.elapsed = now;
        }, 60 / 1000);
    }

    ClearStage() {
        this.myEmitter.cleanup();
        this.myEmitter.destroy();
    }

}

