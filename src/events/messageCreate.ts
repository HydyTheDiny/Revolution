import { developers } from "@config";
import ClientEvent from "@util/ClientEvent";
import ExtendedMessage from "@util/ExtendedMessage";
import { AnyThreadChannel, GuildTextableChannel, Message } from "eris";

export default new ClientEvent('messageCreate', async function(message) {
  const msg = new ExtendedMessage(message as Message<Exclude<GuildTextableChannel, AnyThreadChannel>>, this);
  const load = await msg.load();
  const { cmd } = msg;

  if (load === false || cmd === null) return;

  if (!developers.includes(msg.author.id)) {
    if (cmd.restrictions.includes("developer")) {
      return message.reply("Only developers can run this command.")
    }

    if (cmd.restrictions.includes("nsfw") && !msg.channel.nsfw) {
			return msg.reply("H-hey! You have to use that in an nsfw channel!");
		}
  }

  void cmd.run.call(this, msg, cmd);
});