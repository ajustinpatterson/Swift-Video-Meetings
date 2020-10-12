import { Router } from 'express';

const router = Router();
const controller = require('../controller/controller');

router.get('/', controller.redirect);

router.get('/:room', controller.render);

module.exports = router;