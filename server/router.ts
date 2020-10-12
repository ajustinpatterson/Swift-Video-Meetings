import { Router } from 'express';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';

const router = Router();

router.get('/', (req, res)=> {
  res.redirect(`/${uuidv4()}`);
});

router.get('/:room', (req, res) => {
  res.render('room', {roomId: req.params.room})
});


module.exports = router;