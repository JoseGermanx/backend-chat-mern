import { Application, json, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { config } from '../config';

// SOCKETS configuration

export class ChatServer {

  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.standardMiddleware(this.app);
  }

  private securityMiddleware(app: Application): void {
    //
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb'}));
  }

  private async startServer(app: Application): Promise<void> {
    //
  }

  private startHttpServer(httpServer: http.Server): void {
    //
  }

}
