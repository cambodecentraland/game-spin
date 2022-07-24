"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("request_spin", (client, message) => {
            let result = this.getRandomInt(100);
            this.send(client, "respond_spin", result);
            this.broadcast("respond_broadcast_spin", result);
        });
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
//# sourceMappingURL=MyRoom.js.map