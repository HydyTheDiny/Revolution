import { developers } from "@config";
import { nsfwanswer } from "@config/assets/responses";
import ClientEvent from "@util/ClientEvent";
import { Permissions } from "@util/Constants";
import ExtendedMessage from "@util/ExtendedMessage";
import { Strings, Timers } from "@uwu-codes/utils";
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
			return msg.reply(nsfwanswer[Math.round(Math.random() * (nsfwanswer.length - 1))]);
		}

    const optionalUser = [] as Array<Permissions>;
		const missingUser = [] as Array<Permissions>;
		for (const [perm, optional] of cmd.userPermissions) {
			if (!msg.member.permissions.has(perm)) {
				if (optional) optionalUser.push(perm);
				else missingUser.push(perm);
			}
		}

    if (missingUser.length > 0) {
			return msg.reply(`Hey! You're missing the ${Strings.plural("permission", missingUser)} **${Strings.joinAnd(missingUser.map(p => p || p), "**, **")}**. You must have these to use this command!`);
		}
  }

  void cmd.run.call(this, msg, cmd);
});