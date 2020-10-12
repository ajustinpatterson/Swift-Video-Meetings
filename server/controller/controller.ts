import {v4 as uuidv4} from 'uuid';

const redirect = (req: any, res: any) => {
  res.redirect(`/${uuidv4()}`);
}

const render = (req: any, res: any) => {
  const { room } = req.params;
  res.render('room', {roomId: { room }});
}

module.exports = {
  redirect,
  render
}