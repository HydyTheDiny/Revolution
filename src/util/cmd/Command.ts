import Revolt from "@Revolt";
import { ArrayOneOrMore } from "@root/types";
import ExtendedMessage from "@util/ExtendedMessage";
import { MessageContent } from "eris";
import CommandHandler from "./CommandHandler";

export type CommandRestrictions = "beta" | "developer" | "nsfw";
export default class Command {
  triggers: ArrayOneOrMore<string>;
  restrictions = [] as Array<CommandRestrictions>;
  usage: ((this: Revolt, msg: ExtendedMessage, cmd: Command) => MessageContent | null | Promise<MessageContent | null>) = () => null;
  description = "";
  parsedFlags = [] as Array<string>;
  category: string;
  file: string;
	run: (this: Revolt, msg: ExtendedMessage, cmd: Command) => Promise<unknown>;

  constructor(first: string, ...other: string[]) {
    this.file = (/((?:[A-Z]:[\S\s]+|\\[\S\s]+)|(?:\/[\w-]+)+\..+)/.exec(new Error().stack!.split("\n")[2]) ?? [])[1]?.split(":")?.slice(0, -2)?.join(":");
    this.setTriggers(first, ...other)
  }

  setTriggers = (first: string, ...other: string[]) => {
    this.triggers = [first, ...other];
    return this;
  }

  setRestrictions(...data: Command["restrictions"]) {
		this.restrictions = data;
		return this;
	}

  setUsage(data: string | null | Command["usage"]) {
		this.usage = typeof data !== "function" ? () => data : data;
		return this;
	}

  setDescription(data: string) {
		this.description = data;
		return this;
	}

  setParsedFlags(...data: Array<string>) {
		this.parsedFlags = data;
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