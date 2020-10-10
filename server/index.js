import { builtinModules } from 'module';
import { ChatServer } from './chat-server';

let app = new ChatServer().getApp();

app.get('/', (req, res) => {
  res.send('Hello from index.js')
})

module.exports = app;