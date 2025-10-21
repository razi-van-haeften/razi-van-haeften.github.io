export class UIManager {
    constructor(socketManager) {
        this.socketManager = socketManager;

        this.declare_HTML();
        this.registerEvents();

        this.chatRecord = [];
        this.MAX_CHAT = 8;
    }
    registerEvents() {
        this.onConnect();
        this.onDisconnect();
        this.onJoin();
        this.onRecieveChat();

        this.sendChat();
        this.typeChat();
    }
    declare_HTML() {
        this.menu = {};
        this.menu.container = document.getElementById("menu-container");
        this.menu.input = document.getElementById("menu-input");
        this.menu.button = document.getElementById("menu-button");
        this.menu.log = document.getElementById("menu-log");

        this.game = {};
        this.game.container = document.getElementById("game-container");
        this.game.input = document.getElementById("chat-input");
        this.game.button = document.getElementById("chat-button");
        this.game.log = document.getElementById("game-log");
    }
    switchToGame() {
        this.menu.container.style.display = "none";
        this.game.container.style.display = "flex";
    }
    sendChat() {
        this.game.button.addEventListener("click", () => {
            const message = this.game.input.value.trim();
            if (!message) return;
            this.socketManager.sendChat(message);
            this.game.input.value = "";
        });
        this.game.input.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                const message = this.game.input.value.trim();
                if (!message) {
                    this.game.input.blur();
                    return;
                }
                this.socketManager.sendChat(message);
                this.game.input.value = "";
                this.game.input.blur();
            }
        })
    }
    onJoin() {
        this.menu.button.addEventListener("click", (event) => {
            const name = this.menu.input.value.trim();
            if (!name) {
                this.socketManager.joinGame("unamed");
            } else {
                this.socketManager.joinGame(name);
            }
            this.switchToGame();
        });
        window.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                const name = this.menu.input.value.trim();
                if (!name) {
                    this.socketManager.joinGame("unamed");
                } else {
                    this.socketManager.joinGame(name);
                }
                this.switchToGame();
            }
        });
    }
    onConnect() {
        this.socketManager.addEventListener("connected", () => {
            this.menu.button.classList.remove("blocked");
            this.menu.button.innerHTML = "join";
        });
    }
    onDisconnect() {
        this.socketManager.addEventListener("disconnected", () => {
            this.menu.button.classList.add("blocked");
            this.menu.button.innerHTML = "...";
        });
    }
    onRecieveChat() {
        this.socketManager.addEventListener("recievedChat", (data) => {
            this.game.log.textContent = "";
            const message = data.detail.message.split("\x1F");
            this.chatRecord.push(message);
            if (this.chatRecord.length > this.MAX_CHAT) this.chatRecord.shift();
            for (var i = 0; i < this.chatRecord.length; i++) {
                this.game.log.innerHTML += `<name>${this.chatRecord[i][0]}:</name>   ${this.chatRecord[i][1]}\n`;
            }
        });
    }
    typeChat() {
        window.addEventListener("keydown", (event) => {
            if (event.key.toLowerCase() == "t") {
                const active = document.activeElement;
                if (active === this.game.input || active.tagName === "INPUT" || active.tagName === "TEXTAREA") {
                    return;
                }
                event.preventDefault();
                this.game.input.focus();
            }
        });
    }
}