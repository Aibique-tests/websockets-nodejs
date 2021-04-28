import express, { Request, Response, Application } from 'express';
const app: Application = express();
const PORT = process.env.PORT || 3000;
import http from 'http';
const server = http.createServer(app);
import { Server, Socket } from 'socket.io';
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: Socket) => {
    console.log('user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`listening at port: http://localhost:${PORT}`);
});
