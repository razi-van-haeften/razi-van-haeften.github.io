import { SocketManager } from "./managers/SocketManager.js";
import { UIManager } from "./managers/UIManager.js";

const socket = new SocketManager("https://backend-ziq1.onrender.com");
const ui = new UIManager(socket);
window.socket = socket;
window.ui = ui;

const canvas = document.getElementById("game-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.fillStyle = "salmon";
ctx.fillRect(0, 0, 10, 10);