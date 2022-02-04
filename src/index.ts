import './util/env';
import './util/MonkeyPatch';
import Revolt from './main';
const Revolution = new Revolt(process.env.TOKEN!, {
  intents: [
    'allNonPrivileged'
  ],
  restMode: true,
  maxShards: 'auto',
});


import { addSpeechEvent } from 'discord-speech-recognition';
import { joinVoiceChannel } from "@discordjs/voice";
addSpeechEvent(Revolution);

Revolution.on("messageCreate", (msg) => {
  var vc = '922961274634129489'
  Revolution.joinVoiceChannel(vc)
});

Revolution.on("speech", (msg) => {
  msg.author.send(msg.content);
});

Revolution.launch();