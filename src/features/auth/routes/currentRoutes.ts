import express, { Router } from 'express';
import { CurrentUser } from '@auth/controllers/currentUser';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {

    // chain of responsability: https://refactoring.guru/es/design-patterns/chain-of-responsibility
    this.router.get('/currentUser', authMiddleware.checkAuthentication, CurrentUser.prototype.read);

    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
