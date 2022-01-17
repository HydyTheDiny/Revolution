import './util/env';
import './util/MonkeyPatch';
import Revolt from './main';

const Revolution = new Revolt(process.env.TOKEN!, {
  intents: [
    'allNonPrivileged'
  ]
});

Revolution.launch();