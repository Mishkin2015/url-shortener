import { Router } from 'express';
import handleCustomRoute from 'jscommons/dist/expressPresenter/handleCustomRoute';
import mixinCors from 'jscommons/dist/expressPresenter/mixins/cors';
import mixinHelmet from 'jscommons/dist/expressPresenter/mixins/helmet';
import mixinMorgan from 'jscommons/dist/expressPresenter/mixins/morgan';
import Config from './utils/Config';
import visitLink from './visitLink';

export default (config: Config): Router => {
  const router = Router();

  // Adds mixins.
  router.use(mixinCors());
  router.use(mixinHelmet());
  router.use(mixinMorgan(config.morganDirectory));

  // Adds routes.
  router.get(config.customRoute, handleCustomRoute(config));
  router.get(`/:shortUrl(\\w+)`, visitLink(config));

  return router;
};
