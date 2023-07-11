const Koa = require('koa');
const http = require ('http');
const socket = require('socket.io');


const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)