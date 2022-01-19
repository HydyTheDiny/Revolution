import { Message } from "eris";

export default class Functions {
  static messageToOriginal = (message: Message): Record<string, unknown> & { id: string; } => {
    return {
      id: message.id,
      channel_id: message.channel.id,
			guild_id: "guild" in message.channel ? message.channel.guild.id : undefined,
			author: {
				...message.author.toJSON(),
				public_flags: message.author.publicFlags
			},
			member: {
				...message.member,
				user: {
					...message.author.toJSON(),
					public_flags: message.author.publicFlags
				},
				joined_at: !message.member || message.member.joinedAt === null ? undefined : new Date(message.member.joinedAt).toISOString(),
				premium_since: message.member?.premiumSince,
				deaf: !!message.member?.voiceState.deaf,
				mute: !!message.member?.voiceState.mute,
				pending: message.member?.pending
			},
			content: message.content,
			timestamp: new Date(message.timestamp).toISOString(),
			edited_timestamp: message.editedTimestamp === undefined ? undefined : new Date(message.editedTimestamp ?? 0).toISOString(),
			tts: !!message.tts,
			mention_everyone: message.mentionEveryone,
			mentions: message.mentions.map(m => ({
				...m.toJSON(),
				public_flags: m.publicFlags,
				member: {
					...m,
					user: {
						...message.author.toJSON(),
						public_flags: message.author.publicFlags
					},
					joined_at: new Date(message.member?.joinedAt ?? 0).toISOString(),
					premium_since: message.member?.premiumSince,
					deaf: !!message.member?.voiceState.deaf,
					mute: !!message.member?.voiceState.mute,
					pending: message.member?.pending
				}
			})),
			mention_roles: message.roleMentions,
			mention_channels: message.channelMentions,
			attachments: message.attachments,
			embeds: message.embeds,
			reactions: Object.entries(message.reactions).map(([k, v]) => ({
				count: v.count,
				me: v.me,
				emoji: k.includes(":") ? {
					id: null,
					name: k
				} : {
					id: k.split(":")[0],
					name: k.split(":")[1]
				}
			})),
			pinned: !!message.pinned,
			webhook_id: message.webhookID,
			type: message.type,
			activity: message.activity,
			application: message.application,
			application_id: message.application?.id,
			message_reference: message.messageReference === null ? undefined : {
				message_id: message.messageReference.messageID,
				channel_id: message.messageReference.channelID,
				guild_id: message.messageReference.guildID
			},
			flags: message.flags,
			sticker_items: message.stickerItems,
			referenced_message: message.referencedMessage === undefined ? undefined : message.referencedMessage === null ? null : this.messageToOriginal(message.referencedMessage),
			interaction: null,
			components: message.components
		};
  }
}