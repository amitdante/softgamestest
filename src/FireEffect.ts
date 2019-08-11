import * as PIXI from "pixi.js";
import particles = require('pixi-particles');


export class FireEffect {
    constructor(app: PIXI.Application, texture: PIXI.BaseTexture) {
        this.app = app;
        this.flameTexture = new PIXI.Texture(texture);

        this.StartParticle();
    }
    flameTexture: PIXI.Texture;
    app: PIXI.Application;
    container: PIXI.Container;
    myEmitter: particles.Emitter;

    StartParticle() {
        this.myEmitter = new particles.Emitter(

            // The PIXI.Container to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the root stage Container
            this.container,

            // The collection of particle images to use
            [this.flameTexture],

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
        let updateFunc = this.update.bind(this);
        updateFunc();
        this.myEmitter.emit = true;
    }
    elapsed = Date.now();

    // Update function every frame
    update() {

        // Update the next frame
        requestAnimationFrame(this.update);

        var now = Date.now();

        // The emitter requires the elapsed
        // number of seconds since the last update
        this.myEmitter.update((now - this.elapsed) * 0.001);
        this.elapsed = now;

        // Should re-render the PIXI Stage
        // renderer.render(stage);
    };

    // Start emitting


    // Start the update

}