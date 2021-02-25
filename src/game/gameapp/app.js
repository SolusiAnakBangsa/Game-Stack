import { assets } from "./assets";
import { Floor } from "./objects/floor";
import { Sky } from "./objects/sky";
import { Resizer } from "./resizer";
import { RunMan } from "./objects/runningman";
import { Scene } from "./scene";

export class GameApp {

    constructor(options) {
        // Creates the app according to the options
        this.app = new PIXI.Application(options);
        this.loader = new PIXI.Loader();
        this.resizer = new Resizer();
        this.scene = new Scene();
        
        // Initializes the program
        this.initialize();
    }

    initialize() {
        // This is the method to initialize all the game
        // functionality with loaders, and tickers.
        this.load();
    }

    load() {
        for (let ast in assets) {
            this.loader.add(ast, assets[ast]);
        }
        this.loader.load(this.setup.bind(this));
    }

    setup(loader, resources) {
        // This object is useful to store all the references needed by objects
        // When creating. All `Object` classes has pixiRef as the constructor argument.
        const pixiRef = {
            app: this.app,
            loader: loader,
            resources: resources,
            resizer: this.resizer,
        };
        
        // Make the floor object. and add then to the scene.
        this.scene.addObj(new Floor(pixiRef));
        this.scene.addObj(new Sky(pixiRef));
        const runman = new RunMan(pixiRef);
        runman.speed = 0.25;
        this.scene.addObj(runman);
        
        // Add the scene to the main stage
        this.app.stage.addChild(this.scene.container);

        // Setup the loop
        this.app.ticker.add(this.loop.bind(this));
        this.resizer.add(this.onResize.bind(this));
    }

    loop(delta) {
        // Everything here will loop every frame

        // Do resizer event handler
        this.resizer.loop(this.app.ticker.deltaMS);

        // Scene too
        this.scene.loop(this.app.ticker.deltaMS);
    }

    onResize() {
        this.scene.onResize();
    }
}