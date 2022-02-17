import Command from "@util/cmd/Command";

export default new Command("math")
	.setDescription("does math so you dont have to")
	.setExecutor(async function(msg) {
		msg.reply('Command Currently in the works if you think this is a problem, contact the dev team')
	});