import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();
import socketio from 'socket.io';
import { Server } from 'http';

const app = express();

const router = require('./router');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const expressServer = new Server(app);

const io = socketio(expressServer);

app.use(router);

const port: number = Number(process.env.PORT);

app.listen(port, ()=> {
console.log(`Server now running at port ${port}`)
})

