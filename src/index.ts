import './util/env';
import './util/MonkeyPatch';
import Revolt from './main';
import * as config from './config'
const Revolution = new Revolt(process.env.TOKEN!, {
  intents: [
    'allNonPrivileged'
  ],
  restMode: true,
  maxShards: 'auto',
});

console.log(config.buildRoot)
console.log(config.root)

Revolution.launch();