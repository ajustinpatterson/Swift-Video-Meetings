import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import socketio from 'socket.io';
import { Server } from 'http';

const app = express();

import { router } from './routes/router';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

const db = require('./model/db');

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const expressServer = new Server(app);

const io = socketio(expressServer);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(router);

import dotenv from 'dotenv';
dotenv.config();

const port: number = Number(process.env.PORT);

(async () =>{
  try {
    await db.sequelize.sync();
    expressServer.listen(port, ()=> {
      console.log(`Server now running at port ${port}`)
      })
    } catch (error) {
    console.error('Error connecting to the db', error);
  }
})();