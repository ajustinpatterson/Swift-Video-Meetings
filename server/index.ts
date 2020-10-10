import * as express from 'express';
import * as dotenv from 'dotenv';

import * as router from './router';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(router)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})