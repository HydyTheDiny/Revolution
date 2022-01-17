import path from "path";
import moduleAlias from "module-alias";
import Eris from "eris";
import ComponentInteractionCollector from "./components/ComponentInteractionCollector";
const d = path.resolve(`${__dirname}/../`);
moduleAlias.addAliases({
	"@root": d,
	"@config": `${d}/config`,
	"@util": `${d}/util`,
	"@events": `${d}/events`,
	"@Revolt": `${d}/main`
});


Object.defineProperties(Eris.User.prototype, {
	tag: {
		get(this: Eris.User) {
			return `${this.username}#${this.discriminator}`;
		}
	}
})

Object.defineProperties(Eris.Member.prototype, {
	tag: {
		get(this: Eris.Member) {
			return this.user.tag;
		}
	}
})

Object.defineProperties(Eris.Message.prototype, {
	cmdInteraction: {
		value: null,
		writable: true,
		enumerable: true,
	},
	reply: {
		value(this: Eris.Message, content: Eris.MessageContent, file: Eris.FileContent | Array<Eris.FileContent>) {
			if (typeof content === "string") content = { content };
			if (this.id === "000000000000000000") return this.channel.createMessage(content);
			else return this.channel.createMessage({
				...content,
				messageReference: {
					messageID: this.id,
					guildID: this.guildID,
					channelID: this.channel.id,
					failIfNotExists: false
				}
			}, file);
		}
	}
})

Object.defineProperties(Eris.GuildChannel.prototype, {
	awaitComponentInteractions: {
		async value(this: Eris.GuildTextableChannel, timeout: number, filter: (interaction: Eris.ComponentInteraction) => boolean = (() => true), limit?: number) {
			return ComponentInteractionCollector.awaitInteractions(this.id, timeout, filter, limit as 1);
		}
	},
	awaitComponentInteractionsGeneric: {
		async value(this: Eris.GuildTextableChannel, timeout: number, messageId: string, userId: string, limit?: number) {
			return ComponentInteractionCollector.awaitInteractions(this.id, timeout, (it) => it.message.id === messageId && ((!!it.user && it.user.id === userId) || (!!it.member && it.member.id === userId)), limit as 1);
		}
	},
	typeString: {
		get(this: Eris.GuildTextableChannel) {
			const deprecatedChannelTypes = [
				"GUILD_STAGE"
			];
			return Object.entries(Eris.Constants.ChannelTypes).filter(([t]) => !deprecatedChannelTypes.includes(t)).find(([, n]) => this.type === n)![0];
		}
	}
})