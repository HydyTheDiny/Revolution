import "eris";
import { Interface } from "readline";

declare module "eris" {
  interface Member {
    readonly tag: string;
  }

  interface User {
    readonly tag: string;
  }

  interface Message<T = GuildTextableChannel> {
    args: Array<string>;
		rawArgs: Array<string>;
		cmdInteraction: CommandInteraction | null;
		private client: Client;
    reply(content: MessageContent, file?: MessageFile | Array<MessageFile>): Promise<Message<T>>;
  }

  interface GuildChannel {
    readonly typeString: Exclude<keyof Constants["ChannelTypes"], "GUILD_STAGE">;

    async awaitComponentInteractions(timeout: number, filter: (interaction: ComponentInteraction) => boolean, limit: number): Promise<Array<ComponentInteraction>>;
		async awaitComponentInteractions(timeout: number, filter?: (interaction: ComponentInteraction) => boolean, limit?: 1): Promise<ComponentInteraction | null>;

    async awaitComponentInteractionsGeneric(timeout: number, messageId: string, userId: string, limit: number): Promise<Array<ComponentInteraction>>;
		async awaitComponentInteractionsGeneric(timeout: number, messageId: string, userId: string, limit?: 1): Promise<ComponentInteraction | null>;
  }
}