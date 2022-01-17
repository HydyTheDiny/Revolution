import { Client, ClientOptions } from 'eris';
import { performance } from 'perf_hooks';
import * as fs from 'fs-extra'
import { commandDir, eventDir } from './config';
import ClientEvent from '@util/ClientEvent';
import Utilites from '@util/Utilities';
import Category from '@util/cmd/Category';
import CommandHandler from '@util/cmd/CommandHandler';
import ComponentInteractionCollector from '@util/components/ComponentInteractionCollector';


export default class Revolt extends Client { 
  events = new Map<string, ClientEvent>();

  constructor (token: string, options: ClientOptions) {
    super(token, options);
  }

  launch = async () => {
    ComponentInteractionCollector.setClient(this);

    await this.loadevents();
    await this.loadCommands();
    await this.connect();
  }

  loadevents = async () => {
    const oStart = performance.now();
    if (!fs.existsSync(eventDir)) throw new Error(`eventDir directory ${eventDir} does not exist.`);
    const list = await fs.readdir(eventDir).then(d => d.filter(f => fs.lstatSync(`${eventDir}/${f}`).isFile()).map(file => `${eventDir}/${file}`))
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

  loadCommands = async () => {
    const start = performance.now()
    if (!fs.existsSync(commandDir)) throw new Error(`Command directory ${commandDir} does not exist`);
    const list = await fs.readdir(commandDir).then(v => v.map(ev => `${commandDir}/${ev}`));
    for (const loc of list) {
      const { default: cat } = (await import(loc)) as { default: Category; };
			CommandHandler.registerCategory(cat);
			CommandHandler.loadCategoryCommands(cat.name, cat.dir);
    }
    const end = performance.now();
    console.log(`Loaded ${CommandHandler.commands.length} commands in ${(end - start).toFixed(3)}ms`)
  }
}