import Revolt from "@Revolt";
import { FileContent, GuildTextableChannel, Member, Message, MessageContent, TextChannel } from "eris";
import Command from "./cmd/Command";
import Functions from "./Functions";
import { parse } from "discord-command-parser";
import CommandHandler from "./cmd/CommandHandler";
import { prefix } from "@config";
import { Strings, } from "@uwu-codes/utils";


export default class ExtendedMessage extends Message<GuildTextableChannel> {
  declare prefix: string;
  cmd: Command | null;
  args: Array<string>;
	rawArgs: Array<string>;
  dashedArgs = {
		keyValue: {} as Record<string, string>,
		value: [] as Array<string>
	};
  client: Revolt;
  declare member: Member
  constructor(message: Message, client: Revolt) {
    super(Functions.messageToOriginal(message), client);
    this.cmdInteraction = message.cmdInteraction;
    if (!this.client) this.client = client;
    const self = this;
    this.channel.createMessage = async function createMessage(content: MessageContent, file?: FileContent | Array<FileContent> | undefined) {
			if (self.cmdInteraction !== null) {
				// interaction message isn't a real message
				if (typeof content !== "string" && content.messageReference) delete content.messageReference;
				return self.cmdInteraction.createFollowup({
					...(typeof content === "string" ? { content } : content)
				}, file) as Promise<Message<TextChannel>>;
				// eslint-disable-next-line deprecation/deprecation
			} else return self.client.createMessage.call(self.client, this.id, content, file) as Promise<Message<TextChannel>>;
		};
  }

  async load() {
    const p = parse(this, [
      `<@${this.client.user.id}>`,
			`<@!${this.client.user.id}>`,
      prefix
    ], {
      allowSpaceBeforeCommand: true,
      ignorePrefixCase: true,
    });

    if (p.success === false) return false;

    this.args = p.arguments;
    this.rawArgs = p.body.split(" ");
    this.prefix = p.prefix;
    this.cmd = CommandHandler.getCommand(p.command);
    if (this.cmd !== null) {
      const flags = Strings.parseFlags(this.args.map(arg => arg.includes(" ") ? `"${arg}"` : arg).join(' '), (name) => this.cmd!.parsedFlags.includes(name));
      this.dashedArgs.keyValue = flags.keyValue;
			this.dashedArgs.value = flags.value;
			this.args = flags.normalArgs;
    }
    return true;
  }
}