import * as express from 'express';
import * as dotenv from 'dotenv';
import * as router from './router';
import { ChatServer } from './chat-server';

dotenv.config();

const app = express();

const port = process.env.PORT;


app.use(router)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})