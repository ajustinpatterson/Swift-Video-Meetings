import * as express from 'express';
import { ChatServer } from './chat-server';
import { Routes } from './router';
import * as dotenv from 'dotenv';

let app = new ChatServer().getApp();
const route = new Routes(app);
route.getRoutes();


app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3001);
export { app };
