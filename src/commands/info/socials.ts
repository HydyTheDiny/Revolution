import Command from "@util/cmd/Command";
import EmbedBuilder from "@util/EmbedBuilder";

export default new Command("socials")
	.setDescription("shows all server socials")
	.setExecutor(async function(msg) {
        return msg.reply({
            embeds: [
              new EmbedBuilder(true, msg.author)
              .setTitle('Current Socials')
              .addField('Discord', 'https://discord.gg/PZbaEMkQq4')
              .addField('Mythics Website / Creator', 'https://mythicxgn.glitch.me/')
              .addField('Jpufs Website / Creator', 'https://jpuf.xyz/')
              .addField('Revolution Webpage', 'https://mythicxgn.glitch.me/revolution')
              .toJSON()
            ]
          })
	});