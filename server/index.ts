import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import socketio from 'socket.io';
import { Server } from 'http';

const router = require('./router');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

dotenv.config();

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const io = socketio(server);

const port: number = Number(process.env.PORT);

app.use(router);

server.listen(port, ()=> {
console.log(`Server now running at port ${port}`)
})




// // app.set('view engine', 'ejs');

// app.use(express.static('public'));

// server.listen(port, ()=> {
// console.log(`Server now running at port ${port}`)
// })

// io.on('connection', socket => {
//   socket.on('join-room', (roomId, userId) => {
//     // console.log(roomId, userId)
//     socket.join(roomId)
//     socket.to(roomId).broadcast.emit('user connected', userId)
//   })
// })
