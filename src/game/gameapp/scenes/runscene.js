import { Scene } from "./../scene";
import { Floor } from "./../objects/floor";
import { Sky } from "./../objects/sky";
import { RunMan } from "./../objects/runningman";
import { Pace } from "./../objects/pace";

export class RunScene extends Scene {
    
    constructor(pixiRef) {
        super(pixiRef);
        // The formula of runSpeed to animSpeed is runSpeed/2400

        this.speedRange = [0, 700]; // The range between min and max speed.

        this.runSpeed = 0; // In pixel / second
        this.runSpeedToAnimSpeed = function (floorSpeed) { return this.runSpeed/2700 };
    }

    setup(pixiRef) {
        this.app = pixiRef.app;

        // Animation attributes
        this.initYOffset = this.app.screen.height; // Offset to place the objects in.
        this.floatDuration = 5; // The amount of duration for floatDown.
        this.floatCounter = 0; // Counter for the duration.
        this.lerpFunction = (x) => 1 - Math.pow(1 - x, 3); // Interpolation function to use. (Ease out lerp)
        this.floatState = false; // The state whether to do the float down animation.

        // Make the objects
        // Make the floor object. and add then to the scene.

        this.floor = new Floor(pixiRef);

        this.sky = new Sky(pixiRef);

        this.runman = new RunMan(pixiRef);
        this.runman.speed = 0.25; // Initial

        this.pace = new Pace(pixiRef);

        this.addObj(this.floor);
        this.addObj(this.sky);
        this.addObj(this.runman);
        this.addObj(this.pace);
        this.setAbove();
    }

    loopCode(delta) {
        const deltaS = delta/1000;

        this.floor.setFloorSpeed(this.runSpeed*deltaS);
        this.runman.speed = this.runSpeedToAnimSpeed(this.floor.floorSpeed);
        this.pace.pace = (this.runSpeed/this.speedRange[1]) * 100;
        
        if (this.floatState) {
            // Calculate offset
            const curOffset = this.initYOffset * (this.lerpFunction((this.floatCounter + deltaS)/this.floatDuration) - this.lerpFunction(this.floatCounter/this.floatDuration));

            // Increase the position
            this.floor.mainContainer.y -= curOffset*2;
            this.runman.mainContainer.y -= curOffset*2;
            this.sky.mainContainer.y -= curOffset;

            // Increase the duration.
            this.floatCounter += deltaS;

            // Stop the animation once it reaches floatDuration.
            if (this.floatCounter > this.floatDuration) this.floatState = false;
        }
    }

    start() {
        this.floatDown();
    }

    setAbove() {
        // Function to set every object to be at bottom.
        this.floor.mainContainer.y += this.initYOffset*2;
        this.runman.mainContainer.y += this.initYOffset*2;
        this.sky.mainContainer.y += this.initYOffset;
    }

    floatDown() {
        // Function to pan down to the game, starting it.
        this.floatState = true;
    }

    onResizeCode() {
        
    }
}