import Peer from "peerjs";


export class Server {
    peer = new Peer();

    constructor() {
        this.peer.on("connection", (conn) => {
            conn.on("data", (data) => {
                console.log("Received data", data);
            });
        });

    }

    get serverId () {
        return this.peer.id;
    }

}

export class Client {
    peer = new Peer();

    get clientId () {
        return this.peer.id;
    }

    connectPeer(serverId: string) {
        const conn = this.peer.connect(serverId);
        conn.on("open", () => {
            conn.send("Hello World!");
        });
        conn.on("data", (data) => {
            console.log("Received data", data);
        });  
        return conn; 
    }
}


