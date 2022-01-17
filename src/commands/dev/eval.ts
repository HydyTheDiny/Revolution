import EmbedBuilder from "@util/EmbedBuilder";
import ComponentHelper from "@util/components/ComponentHelper";
import Eris from "eris";
import Functions from "@util/Functions";
import type Revolt from "@Revolt";
import * as config from "@config";
import util from "util";
import Command from "@util/cmd/Command";
import CommandHandler from "@util/cmd/CommandHandler";
import Timer from "@util/Timer";

async function format(obj: unknown) {
	if (obj instanceof Promise) obj = await obj;
	if (Array.isArray(obj)) return JSON.stringify(obj, (k, v: unknown) => typeof v === "bigint" ? `${v.toString()}n` : v);
	return util.inspect(obj, { depth: 1, colors: false, showHidden: false });
}

export default new Command("eval", "ev")
	.setRestrictions("developer")
	.setDescription("Evaluate some code.")
	.setUsage("<code>")
	.setParsedFlags("d", "delete", "s", "silent")
	.setExecutor(async function(msg) {
		const evalVariables: Record<string, unknown> = {
			Eris,
			Functions: Functions,
			CommandHandler,
			currentUser: this.user.tag,
			config
		};

		// eslint-disable-next-line guard-for-in, @typescript-eslint/no-implied-eval, no-new-func -- typescript messes with variable names so we have to remake them
		for (const k in evalVariables) new Function("value", `${k} = value`)(evalVariables[k]);
		let res: unknown;
		const start = Timer.start();
		try {
			const ev = msg.rawArgs.join(" ");
			// eslint-disable-next-line no-eval
			res = await eval(`(async()=>{${!ev.includes("return") ? "return " : ""}${ev}})()`);
		} catch (err) {
			res = err;
		}
		const end = Timer.end();

		const f = await format(res);
		const t = Timer.calc(start, end, 3, false);

		async function evalComponents(this: Revolt, m: Eris.Message<Eris.GuildTextableChannel>) {
			const wait = await msg.channel.awaitComponentInteractions(3e5, (it) => it.message.id === msg.author.id && it.message.id === m.id && it.data.custom_id.startsWith("eval-"));
			console.log(wait);
			if (wait === null) return m.edit({
				components: []
			}).catch(() => null);
			if (wait.data.custom_id.includes("trash")) return m.delete();
			else {
				await msg.delete();
				await m.edit({
					components: m.components?.slice(0, 1)
				});
				void evalComponents.call(this, m);
			}
		}
		if (res instanceof Error) console.log("Eval Error:", res);
		if (msg.dashedArgs.value.includes("delete") || msg.dashedArgs.value.includes("d")) await msg.delete().catch(() => null);
		if (!(msg.dashedArgs.value.includes("silent") || msg.dashedArgs.value.includes("s"))) {
			let file: string | undefined, out = String((msg.dashedArgs.value.includes("raw") || msg.dashedArgs.value.includes("r")) ? res : f);
			if (out.length >= 750) {
				try {
					file = util.inspect(JSON.parse(out), { depth: 1 });
				} catch (e) {
					file = out;
				}
				out = "see attached file";
			}

			const m = await msg.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor(msg.author.tag, msg.author.avatarURL)
						.setTitle(`Time Taken: ${t}`)
						.setColor(res instanceof Error ? "red" : "green")
						.addField(`${config.emojis.default.in} Input`, `\`\`\`js\n${msg.args.join(" ").slice(0, 300)}\`\`\``, false)
						.addField(`${config.emojis.default.out} Output`, `\`\`\`js\n${out}\`\`\``, false)
						.toJSON()
				],
				components: new ComponentHelper()
					// delete result
					.addInteractionButton(ComponentHelper.BUTTON_DANGER, `eval-trash.${msg.author.id}`, false, ComponentHelper.emojiToPartial(config.emojis.default.trash, "default"))
					// delete invocation
					.addInteractionButton(ComponentHelper.BUTTON_SUCCESS, `eval-delete.${msg.author.id}`, false, ComponentHelper.emojiToPartial(config.emojis.default.x, "default"))
					.toJSON()
			}, file === undefined ? undefined : {
				file,
				name: "output.txt"
			});

			void evalComponents.call(this, m);
		} else {
			console.log("Silent Eval Return (formatted):", f);
			console.log("Silent Eval Return (raw):", res);
			console.log("Silent Eval Time:", t);
		}
	});