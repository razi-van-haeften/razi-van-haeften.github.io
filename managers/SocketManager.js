import { concatBuffers } from "./concatBuffers.js";
import { PlayerManager } from "./PlayerManager.js";

export class SocketManager extends EventTarget {
    constructor(url) {
        super();
        this.socket = io(url);
        this.registerEvents();
        this.decoder = new TextDecoder("utf-8");
        this.encoder = new TextEncoder();
        this.players = new PlayerManager();
    }
    registerEvents() {
        this.onConnect();
        this.onDisconnect();
        this.onRecievePacket();
    }
    onConnect() {
        this.socket.on("connect", () => {
            console.log('connected to server');
            this.dispatchEvent(new Event("connected"));
        });
    }
    onDisconnect() {
        this.socket.on("disconnect", () => {
            console.log('lost connection to server');
            this.dispatchEvent(new Event("disconnected"));
        });
    }
    onRecievePacket() {
        this.socket.on("packet", (buffer) => {
            console.log("recieved a packet");
            const view = new DataView(buffer);
            const type = view.getUint8(0);
            const payload = buffer.slice(1);
            switch (type) {
                case 1: this.updatePlayers(); break;
                case 4: this.playerJoined(payload); break; //when a player joins the game
                case 5: this.handleChat(payload); break;
            }
        });
    }
    updatePlayers() {

    }
    playerJoined(buffer) {
        const name = this.decoder.decode(buffer);
        console.log(`${name} joined the game`);
    }
    handleChat(buffer) {
        const message = this.decoder.decode(buffer);
        this.dispatchEvent(new CustomEvent("recievedChat", {
            detail: { message: message }
        }));
    }
    /*
    SEND
    */
    sendPacket(type = Number(), payload) {
        const type_b = new ArrayBuffer(1);
        const view = new DataView(type_b);
        view.setUint8(0, type);
        const buffer = concatBuffers(type_b, payload);
        this.socket.emit("packet", buffer);
    }
    joinGame(name) {
        const payload = this.encoder.encode(name).buffer;
        this.sendPacket(0, payload);
        console.log('sent join packet');
    }
    sendChat(message) {
        const payload = this.encoder.encode(message).buffer;
        const type_b = new ArrayBuffer(1);
        const view = new DataView(type_b);
        view.setUint8(0, 65);
        const buffer = concatBuffers(type_b, payload);
        this.sendPacket(5, buffer);
    }
}