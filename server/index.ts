import express from 'express';
import { ApolloServer, UserInputError } from 'apollo-server-express';
import socketio from 'socket.io';
import { Server } from 'http';
import cors from 'cors';

const app = express();

import { router } from './routes/router';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

import { db } from './model/db';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context () {
    // const jwt = req.headers.authorization;
    return { db };
  }
});

server.applyMiddleware({ app });

const expressServer = new Server(app);

const io = socketio(expressServer);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(cors());
app.use(router);

import dotenv from 'dotenv';
dotenv.config();

const port: number = Number(process.env.PORT);

(async () =>{
  try {
    await db.sequelize.sync(); //{force: true} if columns are added
    console.log('DB is connected 👍');
    expressServer.listen(port, ()=> {
      console.log(`Server now running at port ${port} 👍👍👍`)
      })
    } catch (error) {
    console.error('Error connecting to the db', error);
  }
})();

io.on('connection', socket => {
  console.log('connected')
  socket.on('join-room', (roomId, userId, peerId) => {
    console.log(roomId, userId)
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId, peerId)
​
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})
