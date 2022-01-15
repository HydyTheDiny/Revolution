import './utils/env';
import Revolt from './main';

const Revolution = new Revolt(process.env.TOKEN!, {
  intents: [
    'allNonPrivileged'
  ]
});

Revolution.on("ready", () => {
  console.log(`[LOGIN]: Ready as ${Revolution.user.username}#${Revolution.user.discriminator}`)
});

Revolution.launch();