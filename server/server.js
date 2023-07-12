const Koa = require('koa');
const http = require('http');
const { Server } = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true
  }
});

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080;

io.on('connection', socket => {
  console.log("[IO] Connect => Server has a new connection");
  socket.on('chat.message', data =>{
    console.log('[SOCKET] Chat.message => ', data)
    io.emit('chat.message', data)
  })
  socket.on('disconnect', () => {
    console.log('[SOCKET] Disconnect => A connection has deconected')
  })
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
  console.log(`[HTTP] Listen => Press CTRL+C to stop it`);
});
