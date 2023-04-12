import { Application } from 'express';
import { authRoutes } from '@auth/routes/authRoutes';
import { serverAdapter } from '@services/queues/base.queue';
import { config } from '@configs/configEnvs';
import { currentUserRoutes } from '@auth/routes/currentRoutes';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';

export default (app: Application) => {
  const routes = () => {
    app.use('/queues', serverAdapter.getRouter());
    app.use(config.BASE_PATH!, authRoutes.routes());
    app.use(config.BASE_PATH!, authRoutes.signoutRoute());
    app.use(config.BASE_PATH!, authMiddleware.verifyUser, currentUserRoutes.routes());
  };
  routes();
};
