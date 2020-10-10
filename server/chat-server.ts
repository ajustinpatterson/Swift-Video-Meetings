import * as express from 'express';
import * as dotenv from 'dotenv';

export class ChatServer {
  public static readonly PORT:number = 3002;
  private app: express.Application;
  private port: string | number;

  constructor () {
    this.createApp();
    this.config();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private config(): void {
    this.port = Number(process.env.PORT) || ChatServer.PORT
  }

  private listen(): void  {
    this.app.listen(this.port)
  }

  public getApp(): express.Application {
    return this.app;
  }

}