import Command from "@util/cmd/Command";

export default new Command("ban")
	.setDescription("Ban a user")
	.setExecutor(async function(msg) {
		msg.reply('Command Currently in the works if you think this is a problem, contact the dev team')
	});