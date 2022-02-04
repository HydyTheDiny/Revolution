import Command from "@util/cmd/Command";
import EmbedBuilder from "@util/EmbedBuilder";
import req from 'petitio';

export default new Command("dog")
  .setPermissions("bot", "embedLinks")
  .setDescription('Searches the internet for a dog')
  .setUsage('dog')
  .setExecutor(async function(msg) {
    let data = await req("https://dog.ceo/api/breeds/image/random").json<{success: boolean, message: string, color: number, version: string}>()
    if (!data) return msg.reply('The API returned an error.')
    if (!data.success) return msg.reply('The API returned an error.')
    return msg.reply({
      embeds: [
        new EmbedBuilder(true, msg.author)
        .setTitle('What The Dog Doin')
        .setImage(data.message)
        .toJSON()
      ]
    })
  });