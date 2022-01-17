import Revolt from "@Revolt";
import { ArrayOneOrMore } from "@root/types";
import { Message } from "eris";
import CommandHandler from "./CommandHandler";

export default class Command {
  triggers: ArrayOneOrMore<string>;
  category: string;
  file: string;
	run: (this: Revolt, msg: Message, cmd: Command) => Promise<unknown>;

  constructor(first: string, ...other: string[]) {
    this.file = (/((?:[A-Z]:[\S\s]+|\\[\S\s]+)|(?:\/[\w-]+)+\..+)/.exec(new Error().stack!.split("\n")[2]) ?? [])[1]?.split(":")?.slice(0, -2)?.join(":");
    this.setTriggers(first, ...other)
  }

  setTriggers = (first: string, ...other: string[]) => {
    this.triggers = [first, ...other];
    return this;
  }

  setExecutor(data: Command["run"]) {
		this.run = data;
		return this;
	}

  register(cat: string, log = true) { 
    return CommandHandler.registerCommand(cat, this, log); 
  }

}