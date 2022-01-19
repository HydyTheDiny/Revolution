import { botIcon } from "@config";
import Command from "@util/cmd/Command";
import EmbedBuilder from "@util/EmbedBuilder";
import { performance } from "perf_hooks";

export default new Command("ping")
	.setDescription("Get my ping info.")
	.setExecutor(async function(msg) {
		const m = await msg.channel.createMessage("this will be edited soon");
		const start = performance.now();
		await m.edit("this will be deleted soon");
		const end = performance.now();
		await m.delete();
		return msg.reply({
			embeds: [new EmbedBuilder()
				.setAuthor(msg.author.tag, msg.author.avatarURL)
				.setTitle("Pong!")
				.setDescription(`\ud83c\udfd3 Gateway: **${msg.channel.guild.shard.latency}ms** | REST: **${(end - start).toFixed(0)}ms**`)
				.setFooter(`Revolt | Shard: ${msg.channel.guild.shard.id + 1}/${this.shards.size}`, botIcon)
				.toJSON()
			]
		});
	});