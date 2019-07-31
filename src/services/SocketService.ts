import { SOCKET_PORT } from '@Config/index';

let Socket;


class SocketService {
    static connection(app) {
        const server = require('http').Server(app);
        const io = require('socket.io')(server);
        io.on('connection', function (socket) {
            Socket = socket;
        });
        server.listen(SOCKET_PORT);
        
    }

    static getConnection() {
        return Socket;
    }
}

export default SocketService;