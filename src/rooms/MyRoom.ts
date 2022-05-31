import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.onMessage("request_spin", (client, message) => {
        let result = this.getRandomInt(100);
        this.send(client,"respond_spin",result);
        this.broadcast("respond_broadcast_spin",result);
    });

  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
