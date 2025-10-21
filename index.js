import { SocketManager } from "./managers/SocketManager.js";
import { UIManager } from "./managers/UIManager.js";
import { Vec2 } from "./models/Vec2.js";

function main() {
    const socket = new SocketManager("https://backend-ziq1.onrender.com");
    const ui = new UIManager(socket);
    window.socket = socket;
    window.ui = ui;

    const canvas = document.getElementById("game-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('c2d');
    window.ctx = ctx;
}

main();





