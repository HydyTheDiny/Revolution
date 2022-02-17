import Command from "@util/cmd/Command";

export default new Command("flip")
	.setDescription("flips a coin")
	.setExecutor(async function(msg) {
		msg.reply('Command Currently in the works if you think this is a problem, contact the dev team')
	});