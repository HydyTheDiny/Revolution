import Command from "@util/cmd/Command";

export default new Command("remind")
	.setDescription("reminds you about things")
	.setExecutor(async function(msg) {
		msg.reply('Command Currently in the works if you think this is a problem, contact the dev team')
	});