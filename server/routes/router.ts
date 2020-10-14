import { Router } from 'express';

const router = Router();

import * as controller from '../controller/controller';

router.get('/', controller.redirect);

router.get('/:room', controller.render);

export { router };