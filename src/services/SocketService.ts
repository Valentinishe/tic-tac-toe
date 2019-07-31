import { SOCKET_PORT } from '@Config/index';
import { Socket, Server } from 'socket.io';


let SOCKET;
let IO;


class SocketService {
    static connection(app) {

        const server = require('http').createServer();

        IO = require('socket.io')(server, { serveClient: false });
        server.listen(SOCKET_PORT);

        IO.on('connection', function (socket: Socket) {
            SOCKET = socket;
        });

        
    }

    static getConnection(): { socket: Socket, io: Server } {
        return { socket: SOCKET, io: IO };
    }
}

export default SocketService;