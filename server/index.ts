import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'http';
dotenv.config();
import socketio from 'socket.io';
const router = require('./router');

const app = express();

const server = new Server(app);
const io = socketio(server);

const port: number = Number(process.env.PORT);

app.set('view engine', 'ejs');

// app.get('/', (req, res)=>{
//   res.send('Hello old friends!')
// });
app.use(express.static('public'));
app.use(router);

server.listen(port, ()=> {
console.log(`Server now running at port ${port}`)
})

export { app };
