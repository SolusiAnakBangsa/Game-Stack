import { GameApp } from "./gameapp/app";
import { peer } from "./../script/webrtc";

// Here, lets initialize the webrtc object
peer.init(Math.random().toString(36).slice(2).substr(0, 8));
peer.connection.addEvents('open', () => {
    const notif = document.getElementById("ntf");
    const textbox = document.getElementById("gamecode");
    const playb = document.getElementById("playbutton");
    const flavor = document.getElementById("flavor");
    
    notif.innerText = "Connected!";
    notif.style.display = "block";
    notif.style.backgroundColor = "#22e0da";
    notif.style.padding = "17.5px 50px 17.5px 50px";

    textbox.readOnly = true;
    playb.style.display = "none";

    flavor.innerText = "Let's go! Entering game..."
});

// Game
const game = new GameApp({
    resolution: 1,
    backgroundColor: 0x8febda,
    resizeTo: window, // Resize to the size of the browser window once.
});

// Epic pixel look man!
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

// Change the DOM display to be block.
game.app.renderer.view.style.display = "block";

class ExModule {
    static toggleGame() {
        var peerText = document.getElementById("peer_form");
        peerText.style.display = "none";

        // Display in browser
        document.body.appendChild(game.app.view);
    }

    static bruh() {
        peer.connection.sendData("Bruh memento");
    }

    static initMobileConnection() {
        // Get the game code
        const connectId = document.getElementById("gamecode").value;
        const notif = document.getElementById("ntf");

        if (connectId == "" || connectId.length != 1) {
            notif.innerText = "Please insert a valid game code.";
            notif.style.display = "block";
            notif.style.backgroundColor = "#f27963";
            return;
        }

        notif.innerText = `Connecting to "${connectId}"`;
        notif.style.display = "block";
        notif.style.backgroundColor = "#5c99fa";

        // Connect to the gamecode.
        peer.connectTo(connectId);
    }
}

module.exports = ExModule;