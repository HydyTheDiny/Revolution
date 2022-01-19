import { emojis, root } from "@config";
import * as lockEntries from '@yarn-tool/yarnlock-entries'
import pkg from "@root/package.json";
import EmbedBuilder from "@util/EmbedBuilder";
import { Strings, Time } from "@uwu-codes/utils";
import Eris from "eris";
import * as os from "os";
import Command from "@util/cmd/Command";
import CommandHandler from "@util/cmd/CommandHandler";
import { resolve } from "path";

const yarnLock = lockEntries.fromFile(resolve(root,'yarn.lock'))

const typescript = yarnLock.keys().find(item => item.includes("typescript@npm"))!;
const eris = yarnLock.keys().find(item => item.includes("eris"))!;

export default new Command("info")
	.setPermissions("bot", "embedLinks")
	.setDescription("Get some information about me..")
	.setExecutor(async function(msg) {
		return msg.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor(msg.author.tag, msg.author.avatarURL)
					.setDescription(
						"**Stats/General**:",
						`${emojis.default.dot} System Memory: **${Strings.formatBytes(os.totalmem() - os.freemem(), 2)}** / **${Strings.formatBytes(os.totalmem(), 2)}**`,
						`${emojis.default.dot} Process Memory: **${Strings.formatBytes(process.memoryUsage().heapUsed, 2)}** / **${Strings.formatBytes(process.memoryUsage().heapTotal, 2)}**`,
						`${emojis.default.dot} CPU Usage: **${this.cpuUsage}%**`,
						`${emojis.default.dot} Uptime: ${Time.ms(process.uptime() * 1000, true)} (${Time.secondsToHMS(process.uptime())})`,
						`${emojis.default.dot} Shard: **${msg.channel.guild.shard.id + 1}**/**${this.shards.size}**`,
						`${emojis.default.dot} Guilds: **${this.guilds.size}**`,
						`${emojis.default.dot} Large Guilds: **${this.guilds.filter(g => g.large).length}**`,
						`${emojis.default.dot} Channels: **${Object.keys(this.channelGuildMap).length}**`,
						`${emojis.default.dot} Users: **${this.users.size}**`,
						`${emojis.default.dot} Commands: **${CommandHandler.commands.length}** (**${CommandHandler.categories.length}** categories)`,
						"",
						"**Developers**:",
						`${emojis.default.dot} [Creator] [Jpuf0](https://jpuf.xyz)`,
						`${emojis.default.dot} [Creator] [MythicXGN](https://github.com/MythicXGN)`,
						"",
						"**Other**:",
						`${emojis.default.dot} Library: [Eris Custom](https://github.com/DonovanDMC/eris/tree/everything) (**${Eris.VERSION}**, \`${yarnLock.get(eris).version}\`)`,
						`${emojis.default.dot} API Version: **v${Eris.Constants.REST_VERSION}**`,
						`${emojis.default.dot} Gateway Version: **v${Eris.Constants.GATEWAY_VERSION}**`,
						`${emojis.default.dot} Version: **${pkg.version}**`,
						`${emojis.default.dot} Node Version: **${process.version}**`,
						`${emojis.default.dot} Typescript Version: **${yarnLock.get(typescript).version}**`,
					)
					.toJSON()
			],
		});
	});