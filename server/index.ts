import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'http';
import {v4 as uuidV4} from 'uuid';
dotenv.config();
import socketio from 'socket.io';
const router = require('./router');

const app = express();

const http = new Server(app);
const io = socketio(http);

const port: number = Number(process.env.PORT);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.listen(port, ()=> {
console.log(`Server now running at port ${port}`)
})

app.get('/', (req, res)=>{
  res.send('Hello old friends!')
});

export { app };
