import Command from "@util/cmd/Command";
import EmbedBuilder from "@util/EmbedBuilder";
import req from 'petitio';

export default new Command("tentacle")
  .setPermissions("bot", "embedLinks")
  .setRestrictions('nsfw')
  .setDescription('Searches the internet for anal nsfw images')
  .setUsage('tentacle')
  .setExecutor(async function(msg) {
    let data = await req("https://nekobot.xyz/api/image")
    .query("type", "tentacle" ).json<{success: boolean, message: string, color: number, version: string}>()
    if (!data) return msg.reply('The API returned an error.')
    if (!data.success) return msg.reply('The API returned an error.')
    return msg.reply({
      embeds: [
        new EmbedBuilder(true, msg.author)
        .setTitle('NSFW')
        .setImage(data.message)
        .toJSON()
      ]
  });
});