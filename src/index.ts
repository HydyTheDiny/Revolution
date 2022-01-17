import './utils/env';
import './utils/MonkeyPatch';
import Revolt from './main';

const Revolution = new Revolt(process.env.TOKEN!, {
  intents: [
    'allNonPrivileged'
  ]
});

Revolution.launch();