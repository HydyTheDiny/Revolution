import Revolt from '@Revolt';
import type eris from 'eris';

export default class ClientEvent<K extends keyof eris.ClientEvents = keyof eris.ClientEvents> {
  name: K;
  listener: (this: Revolt, ...args: eris.ClientEvents[K]) => void;
  constructor (event: K, listener: (this: Revolt, ...args: eris.ClientEvents[K]) => void) {
    this.name = event;
    this.listener = listener;
  }
}