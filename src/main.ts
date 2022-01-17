import { Client, ClientOptions } from 'eris';
import { performance } from 'perf_hooks';
import * as fs from 'fs-extra'
import { events } from './config';
import ClientEvent from '@utils/ClientEvent';
import Utilites from '@utils/Utilities';


export default class Revolt extends Client { 
  events = new Map<string, ClientEvent>();

  constructor (token: string, options: ClientOptions) {
    super(token, options);
  }

  launch = async () => {
    
    await this.connect();
  }

  loadevents = async () => {
    const oStart = performance.now();
    if (!fs.existsSync(events)) throw new Error(`Events directory "${events}" does not exist.`);
    const list = await fs.readdir(events).then(d => d.filter(f => fs.lstatSync(`${events}/${f}`).isFile()).map(file => `${events}/${file}`))
    console.log(`Found ${list.length} event${list.length > 1 ? "s" : ""} to load`);
    for (const file of list) {
      const start = performance.now();
      let event = await import(file) as ClientEvent | { default: ClientEvent };
      if ( "default" in event) event = event.default;
      if (!Utilites.isOfType(event, ClientEvent)) throw new TypeError(`Export of event "${file}" is not instance of ClientEvent.`);
      this.events.set(event.name, event);
      this.on(event.name, event.listener.bind(this));
      const end = performance.now();
      console.log(`Loaded the ${event.name} event in ${(end - start).toFixed(2)}ms`);
    }
    const oEnd = performance.now();
    console.log(`Loaded ${list.length} event${list.length > 1 ? "s" : ""} in ${(oEnd - oStart).toString(2)}ms`);
  }
}